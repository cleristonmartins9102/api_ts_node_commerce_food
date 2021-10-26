import { ProductModel } from '@/domain/model/product/product-model'
import { AddProductToBasketModel } from './add-product-model'

export interface DbAddToBasket {
  add (product: AddProductToBasketModel): Promise<null>
}
