import { ServerError } from '../erros/server-error'
import { HttpResponse } from '../protocols/http'

export const badRequest = (): HttpResponse => ({ statusCode: 400, body: new ServerError() })
