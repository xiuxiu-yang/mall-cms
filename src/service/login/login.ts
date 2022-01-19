import ctRequest from '../index'
import { IAccount, IDataType, ILoginResult, UserInfo, UserMenus } from './type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  LoginUserMenus = '/role/'
}
export function accountLoginRequest(account: IAccount) {
  return ctRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return ctRequest.get<IDataType<UserInfo>>({
    url: LoginAPI.LoginUserInfo + id
  })
}

export function requestUserMenusByid(id: number) {
  return ctRequest.get<IDataType<UserMenus>>({
    url: LoginAPI.LoginUserMenus + id + '/menu'
  })
}
