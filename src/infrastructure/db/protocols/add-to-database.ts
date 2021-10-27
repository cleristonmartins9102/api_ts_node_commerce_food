export interface AddToDataBase<T> {
  add (data: T, tableName: string): Promise<void>
}
