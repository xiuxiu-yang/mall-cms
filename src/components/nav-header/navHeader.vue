<template>
  <div class="nav-header">
    <i
      class="font-img"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="changeFold"
    ></i>
    <div class="crumbs">
      <breakcrumb :breakCrumb="breakCrumb"></breakcrumb>
    </div>
    <div class="userInfo">
      <el-dropdown>
        <el-avatar :size="30" :src="avatarUrl"></el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>用户信息</el-dropdown-item>
            <el-dropdown-item divided>切换用户</el-dropdown-item>
            <el-dropdown-item @click="handlerExitClick"
              >退出登入</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'

import breakcrumb from '@/base-ui/breakcrumb'

import { pathBreakCrumbs } from '@/utils/mapMenus'
import LocalCache from '@/utils/setCache'
export default defineComponent({
  components: {
    breakcrumb
  },
  setup(props, { emit }) {
    let isFold = ref(false)
    const changeFold = () => {
      isFold.value = !isFold.value
      emit('changeCollapse', isFold.value)
    }

    const breakCrumb = computed(() => {
      const store = useStore()
      const route = useRoute()
      const userMenus = store.state.login.userMenus
      return pathBreakCrumbs(userMenus, route.path)
    })

    const avatarUrl = ref(
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    )

    const router = useRouter()
    const handlerExitClick = () => {
      LocalCache.deletCache('token')
      router.push('/main')
    }
    return {
      isFold,
      breakCrumb,
      avatarUrl,
      changeFold,
      handlerExitClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  .font-img {
    font-size: 30px;
    line-height: 48px;
  }
  .crumbs {
    padding-left: 20px;
    flex-grow: 2;
  }
}
</style>
