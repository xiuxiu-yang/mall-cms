<template>
  <div ref="baseEcharts" style="height: 360px; width: 100%"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watchEffect, PropType } from 'vue'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'
import chinaMapData from './data/china.json'

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<EChartsOption>,
      default: () => ({})
    }
  },
  setup(props) {
    const baseEcharts = ref<HTMLElement>()
    echarts.registerMap('china', chinaMapData)
    onMounted(() => {
      let myEcharts: any
      if (baseEcharts.value) {
        myEcharts = echarts.init(baseEcharts.value)
      }

      window.addEventListener('resize', () => {
        myEcharts.resize()
      })
      watchEffect(() => {
        myEcharts.setOption(props.options)
      })
    })
    return {
      baseEcharts
    }
  }
})
</script>

<style scoped></style>
