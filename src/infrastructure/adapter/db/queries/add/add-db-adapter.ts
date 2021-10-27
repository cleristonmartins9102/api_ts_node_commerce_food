
import { AddProductToBasketModel } from '@/application/basket/protocols/add-product-model'
import { AddToDataBase } from '../../../../db/protocols/add-to-database'
import { connections } from '../../../../db/config/connection'
import { prepare } from '../../../../db/helper/prepare-data'

export class AddDbAdapter implements AddToDataBase<AddProductToBasketModel> {
  async add (data: AddProductToBasketModel, tableName: string): Promise<void> {
    const connection = connections.mysql('frangolino')
    const dataPepared: string = prepare(data)
    const sql = `INSERT INTO ${tableName} SET ?`
    return new Promise((resolve, reject) => {
      const query = connection.query(sql, dataPepared, (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
      console.log('SQL Query:', query.sql)
    })
  }
}
