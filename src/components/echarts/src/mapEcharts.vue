<template>
  <div class="mapEcharts">
    <base-echarts :options="options"></base-echarts>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

import baseEcharts from '@/base-ui/echarts/baseEchats.vue'

import { IEchartsType } from '../type'

import { convertData } from '../utils/convert-data'
export default defineComponent({
  components: {
    baseEcharts
  },
  props: {
    mapData: {
      type: Array as PropType<IEchartsType[]>,
      default: () => []
    }
  },
  setup(props) {
    const options = computed(() => {
      return {
        title: {
          top: 20,
          text: '各省销售量',
          subtext: '',
          x: 'center',
          textStyle: {
            color: '#ccc'
          }
        },
        backgroundColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#0f378f' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#00091a' // 100% 处的颜色
            }
          ],
          globalCoord: false // 缺省为 false
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params: any) {
            if (typeof params.value[2] !== 'undefined') {
              return params.name + ' : ' + params.value[2]
            }
          }
        },
        visualMap: {
          show: false,
          min: 0,
          max: 500,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {}
        },
        geo: {
          map: 'china',
          show: true,
          roam: true,
          label: {
            show: false
          },
          areaColor: '#3a7fd5',
          borderColor: '#0a53e9',
          shadowColor: '#092f8f',
          shadowBlur: 20,
          emphasis: {
            areaColor: '#0a2dae'
          }
        },
        series: [
          {
            label: {
              color: '#fff',
              formatter: '{b}',
              position: 'right',
              show: true
            },
            itemStyle: {
              color: '#fff'
            },
            name: 'light',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(props.mapData)
          },
          {
            type: 'map',
            map: 'china',
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              show: false
            },
            roam: true,
            areaColor: '#031525',
            borderColor: '#FFFFFF'
          },
          {
            name: 'Top 5',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin',
            symbolSize: [50, 50],
            label: {
              show: true,
              color: '#fff',
              fontSize: 9,
              formatter(value: any) {
                return value.data.value[2]
              }
            },
            itemStyle: {
              color: '#D8BC37' //标志颜色
            },
            data: convertData(props.mapData),
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            zlevel: 1
          }
        ]
      }
    }, undefined)
    return {
      options
    }
  }
})
</script>

<style scoped></style>
