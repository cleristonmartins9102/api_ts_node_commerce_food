import { DbAddToBasket } from '@/application/basket/protocols/db-add-to-basket'
import { ok, serverError } from '../helper/http'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class AddToBasketController implements Controller {
  constructor (
    private readonly addToBasket: DbAddToBasket
  ) {
    this.addToBasket = addToBasket
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest
      this.addToBasket.add(body)
      return ok()
    } catch (error) {
      return serverError(error)
    }
  }
}
