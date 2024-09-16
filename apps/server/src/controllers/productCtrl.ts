import './../__importConfig';

import { prismaClient, EProductStatus } from '@repo/db';
import { Request, Response } from 'express';
import { generateOTP } from '@repo/utils';
import slugify from 'slugify';

export const createProduct = async (req: Request, res: Response) => {
  const { published, ...rest } = req.body;
  res.json({
    product: await prismaClient.product.create({
      data: {
        ...rest,
        slug: slugify(`${req.body.title}_${generateOTP(8)}`),
        userId: req.user?.id!,
        status: published ? 'PUBLISHED' : 'DRAFT',
      },
    }),
  });
};

export const updateProduct = async (req: Request, res: Response) => {
  const where: any = {
    id: req.params.productId,
  };

  const { userId, slug, published, productId, id, ...rest } = req.body;

  res.json({
    product: await prismaClient.product.update({
      where,
      data: { ...rest, status: published ? 'PUBLISHED' : 'DRAFT' },
    }),
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const where: any = {
    id: req.params.productId,
  };

  if (req.user?.role != 'ADMIN') where.userId = req.user?.id!;

  await prismaClient.product.delete({
    where,
  });

  res.json({
    message: 'Product deleted!',
  });
};

export const getSingleProduct = async (req: Request, res: Response) => {
  const where: any = {
    id: req.params.productId,
    status: EProductStatus.PUBLISHED,
  };

  res.json({
    product: await prismaClient.product.findFirst({
      where,
    }),
  });
};

export const getMyProducts = async (req: Request, res: Response) => {
  // Extract pagination and keyword parameters
  const keyword = (req.query.keyword as string) || ''; // keyword term
  const minPrice = parseFloat(req.query.minPrice as string) || 0; // Minimum price
  const maxPrice = parseFloat(req.query.maxPrice as string) || Infinity; // Maximum price

  const categoryId = (req.query.categoryId as string) || ''; // keyword term

  // Build the keyword filter dynamically
  const where: any = {
    userId: req.user?.id,
    AND: [],
  };

  if (categoryId) where.categoryId = categoryId;

  if (keyword) {
    where.AND.push({
      OR: [
        {
          title: {
            contains: keyword,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: keyword,
            mode: 'insensitive',
          },
        },
      ],
    });
  }

  if (minPrice || maxPrice < Infinity) {
    where.AND.push({
      price: {
        gte: minPrice,
        lte: maxPrice,
      },
    });
  }
  res.json({
    products: await prismaClient.product.findMany({
      where,
    }),
  });
};

export const getAllProducts = async (req: Request, res: Response) => {
  // Extract pagination and keyword parameters
  const keyword = (req.query.keyword as string) || ''; // keyword term
  const minPrice = parseFloat(req.query.minPrice as string) || 0; // Minimum price
  const maxPrice = parseFloat(req.query.maxPrice as string) || Infinity; // Maximum price
  const categoryId = (req.query.categoryId as string) || ''; // keyword term

  // Build the keyword filter dynamically
  const where: any = {};

  if (categoryId) where.categoryId = categoryId;

  if (keyword) {
    where.AND = [];
    where.AND.push({
      OR: [
        {
          title: {
            contains: keyword,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: keyword,
            mode: 'insensitive',
          },
        },
      ],
    });
  }

  let price: any = null;

  if (minPrice) {
    price = {};
    price.gte = minPrice;
  }

  if (maxPrice < Infinity) {
    if (!price) price = {};
    price.lte = maxPrice;
  }

  if (price) {
    if (!where.AND) where.AND = [];

    where.AND.push({ price });
  }

  if (req.user?.role != 'ADMIN') {
    where.status = EProductStatus.PUBLISHED;
  }
  console.log({ where });

  res.json({
    products: await prismaClient.product.findMany({
      where: { ...where },
    }),
  });
};

export const publishProduct =
  (status: EProductStatus) => async (req: Request, res: Response) => {
    const where: any = {
      id: req.params.productId,
      status:
        status == 'DRAFT' ? EProductStatus.PUBLISHED : EProductStatus.DRAFT,
    };

    res.json({
      product: await prismaClient.product.update({
        where,
        data: {
          status,
        },
      }),
    });
  };

export const getAllProductsByAdmin = async (req: Request, res: Response) => {
  res.json({
    products: await prismaClient.product.findMany(),
  });
};
