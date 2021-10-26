import { AddProductToBasketModel } from '@/application/basket/protocols/add-product-model'
import { AddToDataBase } from '../protocols/add-to-database'
import { BasketRepository } from './basket-repositoy'

class AddDbAdapterStub implements AddToDataBase<AddProductToBasketModel> {
  async add (data: AddProductToBasketModel): Promise<void> {
    return Promise.resolve()
  }
}

describe('Basket Repository', () => {
  test('Ensure BasketRepository calls AddToDataBase with correct value', () => {
    const productModel: AddProductToBasketModel = {
      idProduct: 1
    }
    const addToDataBase = new AddDbAdapterStub()
    const sut = new BasketRepository(addToDataBase)
    const addToDataBaseSpy = jest.spyOn(addToDataBase, 'add')
    sut.add(productModel)
    expect(addToDataBaseSpy).toBeCalledWith(productModel)
  })

  test('Ensure BasketRepository returns error if AddToDataBase throws', async () => {
    const productModel: AddProductToBasketModel = {
      idProduct: 1
    }
    const addToDataBase = new AddDbAdapterStub()
    const sut = new BasketRepository(addToDataBase)
    jest.spyOn(addToDataBase, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.add(productModel)).rejects.toThrow()
  })
})
