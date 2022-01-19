<template>
  <div class="pieEcharts">
    <base-echarts :options="pieOptions"></base-echarts>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

import * as echarts from 'echarts'
import baseEcharts from '@/base-ui/echarts/baseEchats.vue'

import { IEchartsType } from '../type'
export default defineComponent({
  props: {
    pieData: {
      type: Array as PropType<IEchartsType[]>,
      default: () => []
    }
  },
  components: {
    baseEcharts
  },
  setup(props) {
    const pieOptions = computed<echarts.EChartsOption>(() => {
      return {
        title: {
          text: '分类销量',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: props.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    })
    return {
      pieOptions
    }
  }
})
</script>

<style scoped></style>
