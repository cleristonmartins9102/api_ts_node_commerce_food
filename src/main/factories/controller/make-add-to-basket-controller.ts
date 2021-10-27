import { AddToBasketController } from '../../../controller/basket/add-to-basket-controller'
import { Controller } from '../../../controller/protocols/controller'
import { BasketRepository } from '../../../infrastructure/db/basket/basket-repositoy'
import { AddDbAdapter } from '../../../infrastructure/adapter/db/queries/add/add-db-adapter'

export const makeAddToBasketController = (): Controller => {
  const add = new AddDbAdapter()
  const repo = new BasketRepository(add)
  return new AddToBasketController(repo)
}
