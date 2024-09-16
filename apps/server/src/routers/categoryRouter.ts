import { Router } from 'express';
import { getAllCategories } from '../controllers/categoryCtrl';

const categoriesRouter: Router = Router();

categoriesRouter.get('/', getAllCategories);

export { categoriesRouter };
