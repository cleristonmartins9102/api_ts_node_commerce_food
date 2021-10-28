import { AddProductToBasket } from '@/domain/basket'
import { InvalidParamError } from '../config/erros/invalid-param-error'
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
      if (typeof body !== 'undefined' && Object.keys(body).length !== requiredFields.length) {
        return badRequest(new InvalidParamError('Body size incompatible'))
      }

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
