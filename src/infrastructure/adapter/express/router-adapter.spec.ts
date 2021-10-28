import { ok, serverError } from '@/controller/helper/http'
import { Controller } from '@/controller/protocols/controller'
import { HttpRequest, HttpResponse } from '@/controller/protocols/http'
import routerAdapterExpress from './router-adapter'

class AnyControllerStub implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return Promise.resolve(ok())
  }
}

const fakeExpressRequest = {
  body: {
    idProduct: 1
  }
}

const fakeExpressResponse = {
  status: jest.fn((msg: string) => {
    return {
      json: jest.fn()
    }
  }),
  send: (message: any): void => { }
}

describe('Router Adapter Express', () => {
  test('Ensure RouterAdapterExpress calls Controller with correct value', async () => {
    const controller = new AnyControllerStub()
    const routerAdapter = routerAdapterExpress(controller)
    const controllerSpy = jest.spyOn(controller, 'handle')
    await routerAdapter(fakeExpressRequest, fakeExpressResponse)
    expect(controllerSpy).toBeCalledWith({
      body: {
        idProduct: 1
      }
    })
  })

  test('Ensure Change Express Response status if controller returns 200', async () => {
    const controller = new AnyControllerStub()
    const routerAdapter = routerAdapterExpress(controller)
    jest.spyOn(controller, 'handle').mockImplementation(async (httpRequest: HttpRequest): Promise<HttpResponse> => {
      return {
        statusCode: 200,
        body: 'success'
      }
    })
    await routerAdapter(fakeExpressRequest, fakeExpressResponse)
    expect(fakeExpressResponse.status).toBeCalled()
    expect(fakeExpressResponse.status).toBeCalledWith(200)
  })

  test('Ensure Change Express Response status if controller returns error', async () => {
    fakeExpressResponse.status.mockClear()
    const controller = new AnyControllerStub()
    const routerAdapter = routerAdapterExpress(controller)
    jest.spyOn(controller, 'handle').mockImplementation(async (httpRequest: HttpRequest): Promise<HttpResponse> => {
      return {
        statusCode: 500,
        body: serverError('any_error')
      }
    })
    await routerAdapter(fakeExpressRequest, fakeExpressResponse)
    expect(fakeExpressResponse.status).toBeCalledWith(500)
  })
})
