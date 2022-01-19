import ctRequest from '../../../index'
import { IDataType, IDataList, IPayload } from './type'
export function requestDataList(payload: IPayload) {
  return ctRequest.post<IDataType<IDataList>>({
    url: payload.requestUrl,
    data: payload.data
  })
}
export function deleteData(payload: IPayload) {
  return ctRequest.delete({
    url: payload.requestUrl
  })
}
export function createData(payload: IPayload) {
  return ctRequest.post({
    url: payload.requestUrl,
    data: payload.data
  })
}
export function editData(payload: IPayload) {
  return ctRequest.patch({
    url: payload.requestUrl,
    data: payload.data
  })
}
