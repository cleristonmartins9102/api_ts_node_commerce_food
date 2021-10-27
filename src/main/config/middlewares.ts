import { Express } from 'express'
import { bodyParser } from '../middlewares'

export const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser)
}
