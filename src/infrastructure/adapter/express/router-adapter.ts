import { Controller } from '@/controller/protocols/controller'
import { HttpRequest } from '@/controller/protocols/http'
import { Response } from 'express'

export default (controler: Controller): any => {
  return async (req: Request, res: Response): Promise<any> => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const response = await controler.handle(httpRequest)
    if (response.statusCode === 200) {
      res.status(response.statusCode).json(response.body)
    } else {
      res.status(response.statusCode).json({
        error: response.body
      })
    }
  }
}
