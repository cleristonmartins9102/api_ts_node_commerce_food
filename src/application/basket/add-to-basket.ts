import { AddProduct } from '@/domain/basket'
import { ProductModel } from '@/domain/model/product/product-model'
import { AddProductToBasketModel } from './protocols/add-product-model'
import { DbAddToBasket } from './protocols/db-add-to-basket'

export class AddToBasket implements AddProduct {
  constructor (
    private readonly dbRepository: DbAddToBasket
  ) {
    this.dbRepository = dbRepository
  }

  async add (product: AddProductToBasketModel): Promise<ProductModel> {
    return this.dbRepository.add(product)
  }
}
