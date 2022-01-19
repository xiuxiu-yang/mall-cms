<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="FormRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          placeholder="请输入密码"
          v-model="account.password"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import LocalCache from '../../../utils/setCache'
export default defineComponent({
  setup() {
    const account = reactive({
      name: LocalCache.getCache('name') ?? '',
      password: LocalCache.getCache('password') ?? ''
    })

    const rules = {
      name: [
        {
          required: true,
          message: '必须输入用户名',
          trigger: 'blur'
        },
        {
          pattern: /^[a-z0-z]{5,10}$/,
          message: '用户名必须是5-10位字母或者数字',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '必须输入密码',
          trigger: 'blur'
        },
        {
          pattern: /^[(\w).+-]{5,16}$/,
          message: '密码由8-16位构成',
          trigger: 'blur'
        }
      ]
    }
    const store = useStore()
    const FormRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = (isKeepPassword: boolean) => {
      FormRef.value?.validate((valid) => {
        if (valid) {
          if (isKeepPassword) {
            LocalCache.setCache('name', account.name)
            LocalCache.setCache('password', account.password)
          } else {
            LocalCache.deletCache('name')
            LocalCache.deletCache('password')
          }
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }
    return {
      account,
      rules,
      loginAction,
      FormRef
    }
  }
})
</script>

<style scoped></style>
