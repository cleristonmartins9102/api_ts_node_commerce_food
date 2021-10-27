import { DbAddToBasket } from '@/application/basket/protocols/db-add-to-basket'
import { Controller } from '../protocols/controllet'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class AddToBasketController implements Controller {
  constructor (
    private readonly addToBasket: DbAddToBasket
  ) {
    this.addToBasket = addToBasket
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest
    this.addToBasket.add(body)
    return Promise.resolve({ statusCode: 1, body: 22 })
  }
}
