import { ok, serverError } from '@/controller/helper/http'
import { Controller } from '@/controller/protocols/controller'
import { HttpRequest, HttpResponse } from '@/controller/protocols/http'
import routerAdapterExpress from './router-adapter'

type SutTypes = {
  sut: any
  controller: Controller
}

const fakeExpressRequest = {
  body: {
    idProduct: 1
  }
}

const json = jest.fn()
const fakeExpressResponse = {
  status: jest.fn((msg: string) => {
    return {
      json: json
    }
  }),
  send: (message: any): void => { }
}

const makeControlerStub = (): Controller => {
  class AnyControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return Promise.resolve(ok())
    }
  }
  return new AnyControllerStub()
}

const makeSut = (): SutTypes => {
  const controller = makeControlerStub()
  const sut = routerAdapterExpress(controller)
  return {
    sut,
    controller
  }
}

describe('Router Adapter Express', () => {
  test('Ensure RouterAdapterExpress calls Controller with correct value', async () => {
    const { sut, controller } = makeSut()
    const controllerSpy = jest.spyOn(controller, 'handle')
    await sut(fakeExpressRequest, fakeExpressResponse)
    expect(controllerSpy).toBeCalledWith({
      body: {
        idProduct: 1
      }
    })
  })

  test('Ensure Change Express Response status and json if controller returns 200', async () => {
    const { sut, controller } = makeSut()
    jest.spyOn(controller, 'handle').mockImplementation(async (httpRequest: HttpRequest): Promise<HttpResponse> => ({
      statusCode: 200,
      body: 'success'
    }))
    await sut(fakeExpressRequest, fakeExpressResponse)
    expect(fakeExpressResponse.status).toBeCalled()
    expect(fakeExpressResponse.status).toBeCalledWith(200)
    expect(json).toBeCalled()
    expect(json).toBeCalledWith('success')
  })

  test('Ensure Change Express Response status and json if controller returns error', async () => {
    const { sut, controller } = makeSut()
    jest.spyOn(controller, 'handle').mockImplementation(async (httpRequest: HttpRequest): Promise<HttpResponse> => ({
      statusCode: 500,
      body: serverError('any_error')
    }))
    await sut(fakeExpressRequest, fakeExpressResponse)
    expect(fakeExpressResponse.status).toBeCalledWith(500)
    expect(json).toBeCalled()
    expect(json).toBeCalledWith({
      error: serverError('any_error')
    })
  })
})
