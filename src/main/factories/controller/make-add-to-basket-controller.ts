import { AddToBasketController } from '../../../controller/basket/add-to-basket-controller'
import { Controller } from '../../../controller/protocols/controller'
import { BasketRepository } from '../../../infrastructure/db/repository/basket/basket-repositoy'
import { AddDbMysqlAdapter } from '../../../infrastructure/adapter/db/queries/add/add-db-mysql-adapter'
import { AddToBasket } from '../../../application/basket/manager/add-to-basket'

export const makeAddToBasketController = (): Controller => {
  const add = new AddDbMysqlAdapter()
  const repo = new BasketRepository(add)
  const addToBasket = new AddToBasket(repo)
  return new AddToBasketController(addToBasket)
}
