import { createStore, useStore as useVuexStore, Store } from 'vuex'
import { IRootState, StoreState } from './type'
import { login } from './login/login'
import { system } from './main/system/system'
import { dashboard } from './main/analysis/dashboard'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'coderyct',
      age: 18
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login,
    system,
    dashboard
  }
})

export function setupLocal() {
  store.dispatch('login/lodingLocalLogin')
  store.dispatch('system/getDataList', {
    pageName: 'department',
    data: { size: 100, offset: 0 }
  })
  store.dispatch('system/getDataList', {
    pageName: 'role',
    data: { size: 100, offset: 0 }
  })
}

export function useStore(): Store<StoreState> {
  return useVuexStore()
}
export default store
