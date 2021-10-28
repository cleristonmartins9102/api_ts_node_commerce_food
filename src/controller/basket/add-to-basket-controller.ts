import { AddProductToBasket } from '@/domain/basket'
import { ok, serverError } from '../config/helper/http'
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
      await this.addToBasket.add(body)
      return ok('success')
    } catch (error) {
      return serverError(error.message)
    }
  }
}
