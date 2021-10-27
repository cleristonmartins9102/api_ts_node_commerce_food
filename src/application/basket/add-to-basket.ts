import { AddProductToBasket } from '@/domain/basket'
import { AddProductToBasketModel } from './protocols/add-product-model'
import { DbAddToBasket } from './protocols/db-add-to-basket'

export class AddToBasket implements AddProductToBasket {
  constructor (
    private readonly dbRepository: DbAddToBasket
  ) {
    this.dbRepository = dbRepository
  }

  async add (product: AddProductToBasketModel): Promise<null> {
    this.dbRepository.add(product)
    return Promise.resolve(null)
  }
}
