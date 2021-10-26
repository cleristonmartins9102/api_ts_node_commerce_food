import { AddProductToBasketModel } from '@/application/basket/protocols/add-product-model'
import { DbAddToBasket } from '@/application/basket/protocols/db-add-to-basket'
import { AddToDataBase } from '../protocols/add-to-database'

export class BasketRepository implements DbAddToBasket {
  constructor (
    private readonly addToDataBase: AddToDataBase<AddProductToBasketModel>
  ) {
    this.addToDataBase = addToDataBase
  }

  async add (product: AddProductToBasketModel): Promise<null> {
    this.addToDataBase.add(product)
    return Promise.resolve(null)
  }
}
