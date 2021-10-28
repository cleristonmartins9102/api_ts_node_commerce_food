import { AddProductToBasket } from '@/domain/basket'
import { MissingParamError } from '../config/erros/missing-param-error'
import { badRequest, ok, serverError } from '../config/helper/http'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class AddToBasketController implements Controller {
  constructor (
    private readonly addToBasket: AddProductToBasket
  ) {
    this.addToBasket = addToBasket
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest
      const requiredFields = ['idProduct']
      for (const field of requiredFields) {
        if (typeof httpRequest.body === 'undefined' || !httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      await this.addToBasket.add(body)
      return ok('success')
    } catch (error) {
      return serverError(error.message)
    }
  }
}
