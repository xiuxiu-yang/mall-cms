<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <el-card>
          <pie-echarts :pieData="categoryCount"></pie-echarts>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card>
          <map-echarts :mapData="addressSale"></map-echarts>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card>
          <area-echarts :areaData="categoryCount"></area-echarts>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="echarts">
      <el-col :span="12">
        <el-card>
          <line-echarts :lineData="categorySale"></line-echarts>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <bar-echarts :barData="categoryFavor"></bar-echarts>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import {
  pieEcharts,
  areaEcharts,
  lineEcharts,
  barEcharts,
  mapEcharts
} from '@/components/echarts/index'
export default defineComponent({
  name: 'dashboard',
  components: {
    pieEcharts,
    areaEcharts,
    lineEcharts,
    barEcharts,
    mapEcharts
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getCategoryData')
    const categoryCount = computed(() => {
      return store.state.dashboard.categoryCount.map((item) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    const categorySale = computed(() => {
      const xAxisData: string[] = []
      const seriesData: number[] = []
      store.state.dashboard.categorySale.forEach((item) => {
        xAxisData.push(item.name)
        seriesData.push(item.goodsCount)
      })
      return { xAxisData, seriesData }
    })
    const categoryFavor = computed(() => {
      const xAxisData: string[] = []
      const seriesData: number[] = []
      store.state.dashboard.categoryFavor.forEach((item) => {
        xAxisData.push(item.name)
        seriesData.push(item.goodsFavor)
      })
      return { xAxisData, seriesData }
    })
    const addressSale = computed(() => {
      return store.state.dashboard.addressSale.map((item) => {
        return { name: item.address, value: item.count }
      })
    })
    return {
      categoryCount,
      categorySale,
      categoryFavor,
      addressSale
    }
  }
})
</script>

<style scoped>
.echarts {
  margin-top: 40px;
}
</style>
