export const prepare = <T=Object>(data: {}): any => {
  let sql: {} = {}
  for (const [key, value] of Object.entries(data)) {
    const valuePrepared = prepData(value)
    sql = { ...sql, [key]: valuePrepared }
  }
  return sql
}

const prepData = (data: any): string | number => {
  if (typeof data === 'number') return data
  if (typeof data === 'string') return `'${data}'`
  return data
}
