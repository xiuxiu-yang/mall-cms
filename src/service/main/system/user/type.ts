export interface List {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}
export interface IDataList {
  list: List[]
  totalCount: number
}
export interface IDataType<T = any> {
  code: number
  data: T
}

export interface IPayload {
  pageName: string
  requestUrl?: string
  data?: any
  id?: number
}
