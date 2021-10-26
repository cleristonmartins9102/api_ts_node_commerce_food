export interface AddToDataBase<T> {
  add (data: T): Promise<void>
}
