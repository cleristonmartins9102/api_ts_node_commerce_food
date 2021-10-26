import { ExtraIngredientModel } from '@/domain/ingredient/model/extra-ingredient-model'
import { IngredientModel } from '@/domain/ingredient/model/ingredient-model'

export interface AddProductToBasketModel {
  idProduct: number
  noIngredient?: IngredientModel[]
  extraIngredient?: ExtraIngredientModel[]
}
