import './../__importConfig';

import Stripe from 'stripe';

import { Request, Response } from 'express';
import { EUserRole, prismaClient } from '@repo/db';
import { CustomResponseError, TOrderSchema } from '@repo/utils';

export const createOrder = async (req: Request, res: Response) => {
  const orderData: TOrderSchema = req.body;

  const orderItems = orderData.items;

  const itemsToQuantityMapping: Record<string, number> = {};
  orderItems.forEach((item) => {
    itemsToQuantityMapping[item.productId] = item.quantity;
  });

  const products = await prismaClient.product.findMany({
    where: {
      id: { in: orderItems.map(({ productId }) => productId) },
      status: 'PUBLISHED',
    },
  });
  if (products.length != orderItems.length)
    throw new CustomResponseError(404, {
      errors: {
        products: 'Products not found!',
      },
    });
  let itemsPrice = 0;
  let shippingPrice = 0;
  let taxPrice = 0;

  const newOrderItems: any = products.map((product) => {
    if (product.quantityInStock < itemsToQuantityMapping[product.id])
      throw new CustomResponseError(404, {
        errors: {
          products: 'Some products are out of stock!',
        },
      });
    itemsPrice += itemsToQuantityMapping[product.id] * product.price;
    return {
      productId: product.id,
      quantity: itemsToQuantityMapping[product.id],
      priceAtThatTime: product.price,
    };
  });

  let totalPrice = itemsPrice + shippingPrice + taxPrice;

  const order = await prismaClient.order.create({
    data: {
      userId: req.user?.id!,
      address: orderData.address,
      paymentMode: orderData.paymentMode,
      totalPrice,
      itemsPrice,
      shippingPrice,
      taxPrice,
      items: {
        createMany: { data: newOrderItems },
      },
    },
  });

  if (order.paymentMode == 'ONLINE') {
    return res.json({
      order,
      stripePaymentUrl: await getStripePaymentUrlUtil({
        orderId: order.id,
        userId: req.user?.id!,
      }),
    });
  }

  res.json({
    order,
  });
};

export const getAllOrders = async (req: Request, res: Response) => {
  const where: any = {};

  if (req.user?.role != EUserRole.ADMIN) {
    where.userId = req.user?.id;
  }
  if (req.query.orderId) where.id = req.query.id;

  return res.json({
    orders: await prismaClient.order.findMany({
      where,
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    }),
  });
};

export const getSingleOrder = async (req: Request, res: Response) => {
  const where: any = {
    id: req.params.orderId,
  };

  if (req.user?.role != EUserRole.ADMIN) {
    where.userId = req.user?.id;
  }

  return res.json({
    order: await prismaClient.order.findFirst({
      where,
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    }),
  });
};

const stripeRef = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const getStripePaymentUrlUtil = async ({
  orderId,
  userId,
}: {
  orderId: string;
  userId: string;
}) => {
  const order = await prismaClient.order.findFirst({
    where: {
      userId,
      id: orderId,
      cancelledAt: undefined,
      outOfDeliveryAt: undefined,
      deliveredAt: undefined,
    },
    include: {
      items: {
        select: {
          product: true,
          quantity: true,
        },
      },
    },
  });

  if (!order)
    throw new CustomResponseError(404, {
      message: 'Record does not exist',
    });

  const session = await stripeRef.checkout.sessions.create({
    mode: 'payment',

    shipping_address_collection: {
      allowed_countries: ['US', 'IN', 'BN'],
    },

    success_url: `${process.env.STRIPE_CALLBACK_BASE_URL}/setOrderPaid/${orderId}/stripepayment_success_cb`,
    cancel_url: `${process.env.STRIPE_CALLBACK_BASE_URL}/setOrderPaid/${orderId}/stripepayment_cancel_cb`,

    line_items: order.items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: 'usd',
        unit_amount: item.product.price * 100,
        product_data: {
          name: item.product.title,
        },
      },
    })),
  });

  await prismaClient.order.update({
    where: { id: order.id },
    data: {
      stripeSessionId: session.id,
      paidJson: { session: JSON.parse(JSON.stringify(session)) },
      paymentMode: 'ONLINE',
    },
  });
  return session.url;
};

export const getStripePaymentUrl = async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  const userId = req.user?.id!;

  res.json({
    stripePaymentUrl: await getStripePaymentUrlUtil({ orderId, userId }),
  });
};

export const changeStatusOfOrder = async (req: Request, res: Response) => {
  const statuses = req.body;

  const data: any = {};

  if (statuses?.includes('cancelledAt')) {
    data.cancelledAt = new Date();
  }
  if (statuses?.includes('outOfDeliveryAt')) {
    data.outOfDeliveryAt = new Date();
  }
  if (statuses?.includes('deliveredAt')) {
    data.deliveredAt = new Date();
  }

  res.json({
    order: await prismaClient.order.update({
      where: {
        id: req.params.orderId,
      },
      data,
    }),
  });
};

export const setOrderPaid = async (req: Request, res: Response) => {
  const orderId = req.params.orderId;

  const userId = req.user?.id!;

  const order = await prismaClient.order.findFirst({
    where: { id: orderId, userId, paidAt: undefined },
  });

  if (!order || !order.stripeSessionId)
    throw new CustomResponseError(404, {
      errors: {
        message: 'Order not found',
      },
    });

  const stripeSession = await stripeRef.checkout.sessions.retrieve(
    order.stripeSessionId
  );
  if (stripeSession.payment_status != 'paid')
    throw new CustomResponseError(404, {
      errors: {
        message: 'Order payment still not done!',
      },
    });

  await prismaClient.order.update({
    where: { id: orderId },
    data: {
      paidAt: new Date(),
    },
  });
  const order_ = await prismaClient.order.findFirst({
    where: { id: orderId, userId, paidAt: undefined },
    include: {
      items: {
        select: {
          product: {
            select: {
              title: true,
              medias: true,
            },
          },
          quantity: true,
        },
      },
    },
  });
  res.json({
    order: order_,
  });
};
