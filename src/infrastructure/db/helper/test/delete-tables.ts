import { connections } from '../../config/connection'

export const deleteTables = (): void => {
  const name = 'frangolio'
  const connec = connections.mysql(name).query(`SELECT schema_name FROM information_schema.schemata WHERE schema_name = '${name}'`, (error, results, fields) => {
    if (error) throw error
    console.log(results[0])
  })
  // console.log(connec)
  // connections.mysql().query(`SELECT table_name FROM information_schema.tables WHERE table_schema = ${name};`)
}
