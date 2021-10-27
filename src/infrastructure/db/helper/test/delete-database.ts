import { connections } from '../../config/connection'

export const deleteDataBase = (resolve?: any): void => {
  const name = 'frangolino'
  connections.mysql().query(`DROP SCHEMA IF EXISTS ${name};`, (error, results) => {
    if (error) throw error
    resolve(results[0])
  })
}
