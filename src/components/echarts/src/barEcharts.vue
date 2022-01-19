<template>
  <div class="barEcharts">
    <base-echats :options="options"></base-echats>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import * as echarts from 'echarts'

import baseEchats from '@/base-ui/echarts/baseEchats.vue'
export default defineComponent({
  components: {
    baseEchats
  },
  props: {
    barData: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const options = computed<echarts.EChartsOption>(() => {
      return {
        title: {
          text: '商品收藏',
          subtext: '支持鼠标滚动放大缩小'
        },
        xAxis: {
          data: props.barData.xAxisData,
          axisLabel: {
            inside: true,
            color: '#fff'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999'
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: props.barData.seriesData
          }
        ]
      }
    })
    return {
      options
    }
  }
})
</script>

<style scoped></style>
