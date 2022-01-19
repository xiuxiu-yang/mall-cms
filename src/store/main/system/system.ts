import { Module } from 'vuex'

import { ISystemState } from './type'
import { IRootState } from '../../type'
import { IDataList, IPayload } from '@/service/main/system/user/type'

import {
  deleteData,
  requestDataList,
  createData,
  editData
} from '@/service/main/system/user/user'

export const system: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersTotalCount: 0,
      roleList: [],
      roleTotalCount: 0,
      goodsList: [],
      goodsTotalCount: 0,
      menuList: [],
      menuTotalCount: 0,
      departmentList: [],
      departmentTotalCount: 0,
      categoryList: [],
      categoryTotalCount: 0
    }
  },
  mutations: {
    changeUsersList(state, userList: IDataList) {
      state.usersList = userList.list
      state.usersTotalCount = userList.totalCount
    },
    changeRoleList(state, roleList: IDataList) {
      state.roleList = roleList.list
      state.roleTotalCount = roleList.totalCount
    },
    changeGoodsList(state, goodsList: IDataList) {
      state.goodsList = goodsList.list
      state.goodsTotalCount = goodsList.totalCount
    },
    changeMenuList(state, menuList: IDataList) {
      state.menuList = menuList.list
      state.menuTotalCount = menuList.totalCount
    },
    changeDepartmentList(state, departmentList: IDataList) {
      state.departmentList = departmentList.list
      state.departmentTotalCount = departmentList.totalCount
    },
    changeCategoryList(state, categoryList: IDataList) {
      state.categoryList = categoryList.list
      state.categoryTotalCount = categoryList.totalCount
    }
  },
  getters: {
    getDataList(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    }
  },
  actions: {
    async getDataList({ commit }, payload: IPayload) {
      const requestUrl = `/${payload.pageName}/list`
      const pageName =
        payload.pageName.slice(0, 1).toUpperCase() + payload.pageName.slice(1)
      const pageResult = await requestDataList({ ...payload, requestUrl })
      const dataList = pageResult.data
      commit(`change${pageName}List`, dataList)
    },
    async deleteDataAction(context, payload: IPayload) {
      const requestUrl = `/${payload.pageName}/${payload.id}`
      await deleteData({ pageName: payload.pageName, requestUrl })
    },
    async createDataAction({ dispatch }, payload: IPayload) {
      const requestUrl = `/${payload.pageName}`
      await createData({ ...payload, requestUrl })

      dispatch('getDataList', {
        pageName: payload.pageName,
        data: {
          size: 10,
          offset: 0
        }
      })
    },
    async editDataAction({ dispatch }, payload: IPayload) {
      const requestUrl = `/${payload.pageName}/${payload.id}`
      await editData({ ...payload, requestUrl })

      dispatch('getDataList', {
        pageName: payload.pageName,
        data: {
          size: 10,
          offset: 0
        }
      })
    }
  }
}
