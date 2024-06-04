/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import HttpError from '../utils/HttpError'
import Kategorija from '../entities/Kategorija'
import CategoryResponse from '../models/response/CategoryResponse'

class CategoryServices {
  async getAllCategories(): Promise<CategoryResponse[]> {
    return (
      await Kategorija.find()
    ).map((p) => p.toCategoryResponse())
  }

  async getCategoryById(id: number): Promise<Kategorija> {
    const foundCategory = await Kategorija.findOne({
      where: {
        kategorijaId: id,
      }
    })
    if (!foundCategory)
      throw new HttpError(404, `Category with id ${id} not found`)
    return foundCategory
  }
}

export default new CategoryServices()