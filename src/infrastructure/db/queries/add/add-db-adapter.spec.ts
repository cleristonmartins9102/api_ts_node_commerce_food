import { AddProductToBasketModel } from '@/application/basket/protocols/add-product-model'
import { AddToDataBase } from '../../protocols/add-to-database'
import { AddDbAdapter } from './add-db-adapter'
import mysql from 'mysql'

const mockQuery = jest.fn()
jest.mock('mysql', () => ({
  createConnection: (): any => ({
    query: mockQuery.mockImplementationOnce((sql, data, callback) => {
      callback(null, ['success'])
    })
  })
}))

type SutTypes = {
  sut: AddToDataBase<AddProductToBasketModel>
}

const makeSut = (): SutTypes => {
  const sut = new AddDbAdapter()
  return {
    sut
  }
}

describe('Add Db Adapter', () =>
  test('Ensure AddDbAdapter returns error if Mysql throws', async () => {
    const { sut } = makeSut()
    mockQuery.mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.add({ idProduct: 2 }, 'Basket')).rejects.toThrow()
  })
)
