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

type SutTypes = {
  sut: AddToBasket
  addToBasketRepo: DbAddToBasket
}

const makeBasketMysqlRepositoryStub = (): any => {
  class BasketMysqlRepository implements DbAddToBasket {
    async add (product: ProductModel): Promise<ProductModel> {
      return Promise.resolve(makeProductModel)
    }
  }
  return new BasketMysqlRepository()
}

const makeSut = (): SutTypes => {
  const addToBasketRepo = makeBasketMysqlRepositoryStub()
  const sut = new AddToBasket(addToBasketRepo)
  return {
    sut,
    addToBasketRepo
  }
}

const productModel: AddProductToBasketModel = {
  idProduct: 1
}

describe('Add To Basket', () => {
  test('Ensure AddToBasket call BasketMysqlRepository with correct value', () => {
    const { sut, addToBasketRepo } = makeSut()
    const basketRepoSpy = jest.spyOn(addToBasketRepo, 'add')
    sut.add(productModel)
    expect(basketRepoSpy).toBeCalledWith(productModel)
  })

  test('Ensure AddToBasket returns error if BasketMysqlRepository throws', async () => {
    const addToBasketRepo = makeBasketMysqlRepositoryStub()
    jest.spyOn(addToBasketRepo, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const sut = new AddToBasket(addToBasketRepo)
    await expect(sut.add(productModel)).rejects.toThrow()
  })
})
