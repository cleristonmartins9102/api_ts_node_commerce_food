import routerAdapter from '../../infrastructure/adapter/express/router-adapter'
import { Router } from 'express'
import { makeAddToBasketController } from '../factories/controller/make-add-to-basket-controller'

export default (router: Router): void => {
  router.post('/addtobasket', routerAdapter(makeAddToBasketController()))
}
