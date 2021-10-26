import { ProductModel } from '../model/product/product-model'

/**
 * This interface AddProducts on the basket
 */
export interface AddProduct {
  add (product: ProductModel): Promise<ProductModel>
}
