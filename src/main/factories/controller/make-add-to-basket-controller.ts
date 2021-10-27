import { AddToBasketController } from '../../../controller/basket/add-to-basket-controller'
import { Controller } from '../../../controller/protocols/controller'
import { BasketRepository } from '../../../infrastructure/db/repository/basket/basket-repositoy'
import { AddDbAdapter } from '../../../infrastructure/adapter/db/queries/add/add-db-adapter'
import { AddToBasket } from '../../../application/basket/add-to-basket'

export const makeAddToBasketController = (): Controller => {
  const add = new AddDbAdapter()
  const repo = new BasketRepository(add)
  const addToBasket = new AddToBasket(repo)
  return new AddToBasketController(addToBasket)
}
