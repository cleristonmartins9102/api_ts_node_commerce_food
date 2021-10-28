import { AddProductToBasketModel } from '@/application/basket/protocols/add-product-model'
import { AddToDataBase } from '../../../../db/protocols/add-to-database'
import mysql from 'mysql'
import { prepare } from '../../../../db/helper/prepare-data'
import { AddDbMysqlAdapter } from './add-db-mysql-adapter'

const mockQuery = jest.fn()
jest.mock('mysql', () => ({
  createConnection: (): any => ({
    query: mockQuery.mockImplementation((sql, data, callback) => {
      callback(null, ['success'])
    })
  })
}))

jest.mock('../../../../db/helper/prepare-data')

type SutTypes = {
  sut: AddToDataBase<AddProductToBasketModel>
}

const makeSut = (): SutTypes => {
  const sut = new AddDbMysqlAdapter()
  return {
    sut
  }
}

const httpRequest = { idProduct: 2 }
describe('Add Db Adapter', () => {
  test('Ensure AddDbAdapter returns error if Mysql throws', async () => {
    const { sut } = makeSut()
    mockQuery.mockImplementationOnce((sql, data, callback) => {
      callback(new Error())
    })
    await expect(sut.add(httpRequest, 'Basket')).rejects.toThrow()
  })

  test('Ensure AddDbAdapter returns success when mysql success', async () => {
    const { sut } = makeSut()
    await expect(sut.add(httpRequest, 'Basket')).resolves
  })

  test('Ensure AddDbAdapter calls prepare with correct value', async () => {
    const { sut } = makeSut()
    const spy = jest.spyOn(sut, 'add')
    sut.add(httpRequest, 'Basket')
    expect(prepare).toBeCalledWith(httpRequest)
  })
}
)
