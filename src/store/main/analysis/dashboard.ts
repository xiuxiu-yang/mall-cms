import { IRootState } from '@/store/type'
import { Module } from 'vuex'
import { IDashboard } from './type'
import {
  requestCategoryCount,
  requestCategoryFavor,
  requestCategorySale,
  requestAddressSale
} from '@/service/main/analysis/dashboard'
import { IDataType } from '@/service/login/type'

export const dashboard: Module<IDashboard, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryCount: [],
      categorySale: [],
      addressSale: [],
      categoryFavor: []
    }
  },
  mutations: {
    changeCategoryCount(state, countResult: IDataType) {
      state.categoryCount = countResult.data
    },
    changeCategorySale(state, saleResult: IDataType) {
      state.categorySale = saleResult.data
    },
    changeCategoryFavor(state, favortResult: IDataType) {
      state.categoryFavor = favortResult.data
    },
    changeAddressSale(state, addressResult: IDataType) {
      state.addressSale = addressResult.data
    }
  },
  actions: {
    async getCategoryData({ commit }) {
      const countResult = await requestCategoryCount()
      const favortResult = await requestCategoryFavor()
      const saleResult = await requestCategorySale()
      const addressResult = await requestAddressSale()
      commit('changeCategoryCount', countResult)
      commit('changeCategorySale', saleResult)
      commit('changeCategoryFavor', favortResult)
      commit('changeAddressSale', addressResult)
    }
  }
}
