import { AddProductToBasketModel } from '@/application/basket/protocols/add-product-model'
import { DbAddToBasket } from '@/application/basket/protocols/db-add-to-basket'
import { AddToDataBase } from '../protocols/add-to-database'

export class BasketRepository implements DbAddToBasket {
  private readonly tableName: string = 'Basket'
  constructor (
    private readonly addToDataBase: AddToDataBase<AddProductToBasketModel>
  ) {
    this.addToDataBase = addToDataBase
  }

  async add (product: AddProductToBasketModel): Promise<null> {
    this.addToDataBase.add(product, this.tableName)
    return Promise.resolve(null)
  }
}
