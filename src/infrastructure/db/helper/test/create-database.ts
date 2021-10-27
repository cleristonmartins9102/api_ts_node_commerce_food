import { connections } from '../../config/connection'

export const createDataBase = (resolve?: any): void => {
  const name = 'frangolino'
  connections.mysql().query(`CREATE DATABASE IF NOT EXISTS ${name};`, (error, results) => {
    if (error) throw error
    resolve(results[0])
  })
}
