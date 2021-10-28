import { ServerError } from '../erros/server-error'
import { HttpResponse } from '../../protocols/http'
import { MissingParam } from '../erros/missing-param-error'

/* istanbull ignore file */
export const serverError = (error: string): HttpResponse => ({ statusCode: 500, body: new ServerError(error) })
export const badRequest = (error: Error): HttpResponse => ({ statusCode: 400, body: error })
export const ok = (msg?: string): HttpResponse => ({ statusCode: 200, body: msg ?? null })
