import { ServerError } from '../config/erros/server-error'
import { HttpResponse } from '../protocols/http'

export const serverError = (error: string): HttpResponse => ({ statusCode: 500, body: new ServerError(error) })
export const ok = (msg?: string): HttpResponse => ({ statusCode: 200, body: msg ?? null })
