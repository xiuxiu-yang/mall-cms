<template>
  <div class="aside">
    <div class="logoContainer">
      <img class="logo" src="~@/assets/img/logo.svg" alt="logo" />
      <transition
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutLeft"
      >
        <span class="title" v-show="!collapse">Vue3 + Ts</span>
      </transition>
    </div>
    <el-menu
      class="el-menu-vertical"
      background-color="#001529"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :uniqueOpened="true"
      :collapse="collapse"
      :default-active="activeIndex"
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                @click="itemClick(subItem.url)"
                >{{ subItem.name }}</el-menu-item
              >
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
          </el-sub-menu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store/index'
import { useRouter, useRoute } from 'vue-router'
import { pathMapToMenu } from '@/utils/mapMenus'

export default defineComponent({
  props: {
    collapse: {
      tyoe: Boolean,
      default: false
    }
  },
  emits: ['getPathName'],
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const currentPath = route.path
    const userMenus = computed(() => store.state.login.userMenus)

    const menu = pathMapToMenu(userMenus.value, currentPath)
    const activeIndex = ref(menu.id + '')

    const itemClick = (url: string) => {
      router.push({
        path: url ?? '/not-foud'
      })
    }
    return {
      userMenus,
      activeIndex,
      itemClick
    }
  }
})
</script>

<style scoped lang="less">
.aside {
  height: 100%;
  background-color: #001529;
  .logoContainer {
    display: flex;
    flex-direction: row;
    height: 28px;
    padding: 12px 10px 8px 10px;
    align-items: center;
    .logo {
      margin: 0 10px;
      height: 100%;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu-vertical {
    border-right: none;
  }

  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }
  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }
  .el-menu-item:hover {
    color: #fff !important; // 菜单
    background-color: #0a60bd !important;
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
