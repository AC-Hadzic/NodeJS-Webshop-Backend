import { Request, Response } from 'express'
import categoryService from '../services/categoryService'
import appDataSource from '../../api/app-data-source';

const getAllCategories = async (req: Request, res: Response) => {
  if (!appDataSource.isInitialized) {
    await appDataSource.initialize();
  }
  
  res.send(await categoryService.getAllCategories())
}

const getCategoryById = async (req: Request, res: Response) => {
  res.send(
    await categoryService.getCategoryById(Number.parseInt(req.params.id, 10)),
  )
}

export {
    getAllCategories,
    getCategoryById
}