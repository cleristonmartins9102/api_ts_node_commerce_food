import { AddProductToBasketModel } from '@/application/basket/protocols/add-product-model'
import { AddToDataBase } from '../protocols/add-to-database'
import { BasketRepository } from './basket-repositoy'

type SutTypes = {
  sut: BasketRepository
  addToDataBase: AddToDataBase<AddProductToBasketModel>
}

const makeAddDbAdapterStub = (): AddToDataBase<AddProductToBasketModel> => {
  class AddDbAdapterStub implements AddToDataBase<AddProductToBasketModel> {
    async add (data: AddProductToBasketModel, tableName: string): Promise<void> {
      return Promise.resolve()
    }
  }
  return new AddDbAdapterStub()
}

const makeSut = (): SutTypes => {
  const addToDataBase = makeAddDbAdapterStub()
  const sut = new BasketRepository(addToDataBase)
  return {
    sut,
    addToDataBase
  }
}

const productModel: AddProductToBasketModel = {
  idProduct: 1
}

describe('Basket Repository', () => {
  test('Ensure BasketRepository calls AddDbAdapter with correct value', () => {
    const { sut, addToDataBase } = makeSut()
    const addToDataBaseSpy = jest.spyOn(addToDataBase, 'add')
    sut.add(productModel)
    expect(addToDataBaseSpy).toBeCalledWith(productModel, 'Basket')
  })

  test('Ensure BasketRepository returns error if AddToDataBase throws', async () => {
    const { sut, addToDataBase } = makeSut()
    jest.spyOn(addToDataBase, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.add(productModel)).rejects.toThrow()
  })
})
