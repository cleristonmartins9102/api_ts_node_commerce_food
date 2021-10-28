export class InvalidParamError extends Error {
  constructor (stack?: string) {
    super('Invalid Param Error')
    this.name = 'InvalidParamError'
    this.stack = stack
  }
}
