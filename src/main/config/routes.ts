import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express): Express => {
  const router = Router()
  app.use('/api', router)
  const dir = path.join(__dirname, '../routes')
  readdirSync(dir).map(async file => {
    if (!file.endsWith('.map') && file.includes('-routes.ts')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
  return app
}
