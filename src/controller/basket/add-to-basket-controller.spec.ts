import { AddProductToBasketModel } from '@/application/basket/protocols/add-product-model'
import { AddToBasketController } from './add-to-basket-controller'
import { DbAddToBasket } from '@/application/basket/protocols/db-add-to-basket'
import { HttpRequest } from '../protocols/http'

class AddToBasket implements DbAddToBasket {
  async add (product: AddProductToBasketModel): Promise<null> {
    return Promise.resolve(null)
  }
}

describe('AddToBasket Controller', () => {
  test('Ensure AddToBasketController calls AddToBasket with correct value', () => {
    const addProductToBasketModel: AddProductToBasketModel = {
      idProduct: 2
    }
    const httpRequest: HttpRequest<AddProductToBasketModel> = {
      body: addProductToBasketModel
    }
    const addToBasket = new AddToBasket()
    const sut = new AddToBasketController(addToBasket)
    const addToBasketSpy = jest.spyOn(addToBasket, 'add')
    sut.handle(httpRequest)
    expect(addToBasketSpy).toBeCalledWith(httpRequest.body)
  })
})
