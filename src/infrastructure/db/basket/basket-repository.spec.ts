import { AddProductToBasketModel } from '@/application/basket/protocols/add-product-model'
import { AddToDataBase } from '../protocols/add-to-database'
import { BasketRepository } from './basket-repositoy'

class AddDbAdapter implements AddToDataBase<AddProductToBasketModel> {
  async add (data: AddProductToBasketModel): Promise<void> {
    return Promise.resolve()
  }
}

describe('Basket Repository', () => {
  test('Ensure BasketRepository calls AddToDataBase with correct value', () => {
    const productModel: AddProductToBasketModel = {
      idProduct: 1
    }
    const addToDataBase = new AddDbAdapter()
    const sut = new BasketRepository(addToDataBase)
    const addToDataBaseSpy = jest.spyOn(addToDataBase, 'add')
    sut.add(productModel)
    expect(addToDataBaseSpy).toBeCalledWith(productModel)
  })
})
