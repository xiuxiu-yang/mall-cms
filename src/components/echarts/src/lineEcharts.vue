<template>
  <div class="lineEcharts">
    <base-echarts :options="lineOptions"></base-echarts>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

import * as echarts from 'echarts'
import baseEcharts from '@/base-ui/echarts/baseEchats.vue'

import { ILineEchartsType } from '../type'
export default defineComponent({
  components: {
    baseEcharts
  },
  props: {
    lineData: {
      type: Object as PropType<ILineEchartsType>,
      required: true
    }
  },
  setup(props) {
    const lineOptions = computed<echarts.EChartsOption>(() => {
      return {
        title: {
          text: '商品销量'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['商品销量']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: props.lineData.xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '商品销量',
            data: props.lineData.seriesData,
            type: 'line',
            areaStyle: {}
          }
        ]
      }
    })

    return {
      lineOptions
    }
  }
})
</script>

<style scoped></style>
