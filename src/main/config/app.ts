import express from 'express'
import { setupMiddlewares } from './middlewares'
import routes from './routes'

const app = express()
setupMiddlewares(app)
routes(app)
export { app }
