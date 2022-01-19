<template>
  <div class="areaEcharts">
    <base-echarts :options="areaOptions"></base-echarts>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

import * as echarts from 'echarts'
import baseEcharts from '@/base-ui/echarts/baseEchats.vue'

import { IEchartsType } from '../type'
export default defineComponent({
  components: {
    baseEcharts
  },
  props: {
    areaData: {
      type: Array as PropType<IEchartsType[]>
    }
  },
  setup(props) {
    const areaOptions = computed<echarts.EChartsOption>(() => {
      return {
        title: {
          text: '分类销量(玫瑰图)',
          left: 'center'
        },
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            type: 'pie',
            radius: [10, 100],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: props.areaData
          }
        ]
      }
    })
    return {
      areaOptions
    }
  }
})
</script>

<style scoped></style>
