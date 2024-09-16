import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { ObjectIdParamSchema, OrderSchema } from '@repo/utils';
import {
  changeStatusOfOrder,
  createOrder,
  getAllOrders,
  getSingleOrder,
  getStripePaymentUrl,
  setOrderPaid,
} from '../controllers/orderCtrl';
import { requireAdmin, requireAuth } from '../middleware/authMiddleware';

const orderRouter: Router = Router();

// all my orders as well as single by id by passing orderId in query
orderRouter.get(['/', '/myorders'], requireAuth, getAllOrders);

orderRouter.put('/change_status/:orderId', requireAdmin, changeStatusOfOrder);

orderRouter.get(
  '/:orderId',
  validateRequest(ObjectIdParamSchema('orderId'), 'params'),
  requireAuth,
  getSingleOrder
);

// create order
orderRouter.post(
  '/',
  requireAuth,
  validateRequest(OrderSchema, 'body'),
  createOrder
);

orderRouter.get(
  '/getStripePaymentUrl/:orderId',
  (a, b, c) => {
    console.log('objectobjectobjectobjectobjectobject');
    c();
  },
  requireAuth,
  validateRequest(ObjectIdParamSchema('orderId'), 'params'),
  getStripePaymentUrl
);

orderRouter.put('/setOrderAsPaid/:orderId', setOrderPaid);

export { orderRouter };
