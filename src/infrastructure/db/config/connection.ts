import mysql from 'mysql'
import dev from '../../../main/config/dev'

const connections = {
  mysql: (database?: string): mysql.Connection => {
    const config = {
      host: 'localhost',
      user: dev.mysql.user,
      password: dev.mysql.secret
    }
    return mysql.createConnection(database ? { ...config, database: database } : config)
  }
}

export { connections }
