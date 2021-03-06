import { AddProductToBasketModel } from '@/application/basket/protocols/add-product-model'
import { AddToBasketController } from './add-to-basket-controller'
import { DbAddToBasket } from '@/application/basket/protocols/db-add-to-basket'
import { HttpRequest } from '../protocols/http'
import { Controller } from '../protocols/controller'
import { badRequest, ok, serverError } from '../config/helper/http'
import { ServerError } from '../config/erros/server-error'
import { MissingParamError } from '../config/erros/missing-param-error'
import { InvalidParamError } from '../config/erros/invalid-param-error'

type SutTypes = {
  sut: Controller
  addToBasket: DbAddToBasket
}

const makeAddToBasketStub = (): DbAddToBasket => {
  class AddToBasket implements DbAddToBasket {
    async add (product: AddProductToBasketModel): Promise<null> {
      return Promise.resolve(null)
    }
  }
  return new AddToBasket()
}

const makeSut = (): SutTypes => {
  const addToBasket = makeAddToBasketStub()
  const sut = new AddToBasketController(addToBasket)
  return {
    sut,
    addToBasket
  }
}

const addProductToBasketModel: AddProductToBasketModel = {
  idProduct: 2
}
const httpRequest: HttpRequest<AddProductToBasketModel> = {
  body: addProductToBasketModel
}

describe('AddToBasket Controller', () => {
  test('Ensure AddToBasketController calls AddToBasket with correct value', () => {
    const { sut, addToBasket } = makeSut()
    const addToBasketSpy = jest.spyOn(addToBasket, 'add')
    sut.handle(httpRequest)
    expect(addToBasketSpy).toBeCalledWith(httpRequest.body)
  })

  test('Ensure AddToBasketController returns error if validate field fails', async () => {
    const { sut } = makeSut()
    const { idProduct, ...httpReq } = httpRequest.body as any
    const response = await sut.handle(httpReq)
    expect(response).toEqual(badRequest(new MissingParamError('idProduct')))
  })

  test('Ensure AddToBasketController returns error if body size is incompatible', async () => {
    const { sut } = makeSut()
    const httpReq = { body: { ...httpRequest.body, name: 'any_name' } }
    const response = await sut.handle(httpReq)
    expect(response).toEqual(badRequest(new InvalidParamError('Body size incompatible')))
  })

  test('Ensure returns 500 if AddToBasket throws', async () => {
    const { sut, addToBasket } = makeSut()
    jest.spyOn(addToBasket, 'add').mockImplementationOnce(() => {
      throw new Error('any_error')
    })
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(serverError('any_error'))
  })

  test('Ensure returns 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(ok('success'))
  })
})
