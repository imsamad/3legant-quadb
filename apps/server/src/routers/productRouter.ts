import { Router } from 'express';
import { requireAdmin } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validateRequest';
import { ObjectIdParamSchema, ProductSchema } from '@repo/utils';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
  getSingleProduct,
  getAllProducts,
  publishProduct,
  getAllProductsByAdmin,
} from '../controllers/productCtrl';
import { EProductStatus } from '@repo/db';

const productRouter: Router = Router();

productRouter.get('/my', requireAdmin, getMyProducts);

productRouter
  .route('/')
  .post(requireAdmin, validateRequest(ProductSchema, 'body'), createProduct)
  .get(getAllProducts);

productRouter.route('/allProducts').get(requireAdmin, getAllProductsByAdmin);

productRouter
  .route('/:productId')
  .put(
    requireAdmin,
    validateRequest(ObjectIdParamSchema('productId'), 'params'),
    validateRequest(ProductSchema, 'body'),
    updateProduct
  )
  .delete(
    requireAdmin,
    validateRequest(ObjectIdParamSchema('productId'), 'params'),
    deleteProduct
  )
  .get(getSingleProduct);

productRouter
  .route('/publised/:productId')
  .put(
    requireAdmin,
    validateRequest(ObjectIdParamSchema('productId'), 'params'),
    publishProduct(EProductStatus.PUBLISHED)
  );

productRouter
  .route('/unpublised/:productId')
  .put(
    requireAdmin,
    validateRequest(ObjectIdParamSchema('productId'), 'params'),
    publishProduct(EProductStatus.DRAFT)
  );

export { productRouter };
