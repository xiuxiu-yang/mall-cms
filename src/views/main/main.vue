<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <main-aside :collapse="isCollapse"></main-aside>
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @changeCollapse="changeCollapse"></nav-header>
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <el-config-provider :locale="zhCn">
              <router-view @handlerEmit="handlerFn"></router-view>
            </el-config-provider>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElConfigProvider } from 'element-plus'

import zhCn from 'element-plus/lib/locale/lang/zh-cn'

import mainAside from '@/components/nav-menu/mainAside.vue'
import navHeader from '@/components/nav-header/navHeader.vue'

export default defineComponent({
  components: {
    mainAside,
    navHeader,
    ElConfigProvider
  },
  setup() {
    let isCollapse = ref(false)
    const changeCollapse = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    const handlerFn = (value: string) => {
      console.log(value)
    }
    return {
      isCollapse,
      changeCollapse,
      zhCn,
      handlerFn
    }
  }
})
</script>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
}
.main-content {
  height: 100%;
}
.page {
  height: 100%;
  .page-header {
    background-color: #b3c0d1;
    height: 48px;
  }
  .page-content {
    height: calc(100% - 48px);
    .page-info {
      background-color: #fff;
      border-radius: 5px;
    }
  }
}
.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
