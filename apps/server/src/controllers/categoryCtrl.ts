import { Request, Response } from 'express';
import { prismaClient } from '@repo/db';

export const getAllCategories = async (req: Request, res: Response) => {
  res.json({
    categories: await prismaClient.category.findMany(),
  });
};
