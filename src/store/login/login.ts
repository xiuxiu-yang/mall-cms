import { Module } from 'vuex'
import { ILoginState } from './type'
import { IRootState } from '../type'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByid
} from '@/service/login/login'
import { IAccount, UserInfo, UserMenus } from '@/service/login/type'
import LocalCache from '@/utils/setCache'
import routing from '@/utils/mapMenus'
import router from '@/router'
import { menuMaptoPermission } from '@/utils/mapMenus'

export const login: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permission: [],
      checkCorrect: false
    }
  },
  mutations: {
    changeToken(state: any, token: string) {
      state.token = token
    },
    changeUserInfo(state: any, userInfo: UserInfo) {
      state.userInfo = userInfo
    },
    changeUserMenus(state: any, userMenus: UserMenus[]) {
      state.userMenus = userMenus
      const routes = routing(userMenus)
      console.log(routes)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      const permission = menuMaptoPermission(userMenus)
      state.permission = permission
    }
  },
  getters: {},
  actions: {
    async accountLoginAction({ state, commit }, payload: IAccount) {
      try {
        const loginResult = await accountLoginRequest(payload)
        console.log(loginResult)
        const { id, token } = loginResult.data
        commit('changeToken', token)
        LocalCache.setCache('token', token)

        const userInfoResult = await requestUserInfoById(id)
        commit('changeUserInfo', userInfoResult.data)
        LocalCache.setCache('userInfo', userInfoResult.data)

        const userMenusResult = await requestUserMenusByid(
          userInfoResult.data.id
        )
        commit('changeUserMenus', userMenusResult.data)
        LocalCache.setCache('userMenus', userMenusResult.data)

        router.push('/main')
      } catch (e) {
        console.log(e)
        state.checkCorrect = true
      }
    },
    lodingLocalLogin({ commit, dispatch }) {
      const token = LocalCache.getCache('token')
      const userInfo = LocalCache.getCache('userInfo')
      const userMenus = LocalCache.getCache('userMenus')
      if (token) {
        if (userInfo && userMenus) {
          commit('changeToken', token)
          commit('changeUserInfo', userInfo)
          commit('changeUserMenus', userMenus)
        } else {
          const name = LocalCache.getCache('name')
          const password = LocalCache.getCache('password')
          dispatch('accountLoginAction', { name, password })
        }
      }
    }
  }
}
