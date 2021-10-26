import { ProductModel } from '@/domain/model/product/product-model'
import { AddToBasket } from './add-to-basket'
import { AddProductToBasketModel } from './protocols/add-product-model'
import { DbAddToBasket } from './protocols/db-add-to-basket'

const makeProductModel: ProductModel = {
  idProduct: 1,
  name: 'Bicmac',
  category: {
    idCategory: 1,
    name: 'Lanche'
  }
}

const makeBasketMysqlRepositoryStub = (): any => {
  class BasketMysqlRepository implements DbAddToBasket {
    async add (product: ProductModel): Promise<ProductModel> {
      return Promise.resolve(makeProductModel)
    }
  }
  return new BasketMysqlRepository()
}

describe('Add To Basket', () => {
  test('Ensure call BasketMysqlRepository with correct value', () => {
    const productModel: AddProductToBasketModel = {
      idProduct: 1
    }
    const addToBasketRepo = makeBasketMysqlRepositoryStub()
    const basketRepoSpy = jest.spyOn(addToBasketRepo, 'add')
    const sut = new AddToBasket(addToBasketRepo)
    sut.add(productModel)
    expect(basketRepoSpy).toBeCalledWith(productModel)
  })

  test('Ensure AddToBasket return error if BasketMysqlRepository throws', () => {
    const productModel: AddProductToBasketModel = {
      idProduct: 1
    }
    const addToBasketRepo = makeBasketMysqlRepositoryStub()
    const basketRepoSpy = jest.spyOn(addToBasketRepo, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const sut = new AddToBasket(addToBasketRepo)
    const resp = sut.add(productModel)
    expect(resp).toThrow()
  })
})
