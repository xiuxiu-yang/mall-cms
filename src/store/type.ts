import { ILoginState } from '@/store/login/type'
import { ISystemState } from '@/store/main/system/type'
import { IDashboard } from './main/analysis/type'
export interface IRootState {
  name: string
  age: number
}

export interface IModuleState {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboard
}

export type StoreState = IRootState & IModuleState
