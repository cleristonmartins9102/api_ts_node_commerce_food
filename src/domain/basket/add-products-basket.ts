import { ProductModel } from '../model/product/product-model'

/**
 * This interface AddProducts on the basket
 */
export interface AddProductToBasket {
  add (product: ProductModel): Promise<null>
}
