<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>
    <el-tabs type="border-card" stretch v-model="loginMethod">
      <el-tab-pane label="账号登入" name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登入</span>
        </template>
        <login-account ref="LoginAccountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane label="手机登入" name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登入</span>
        </template>
        <login-phone ref="LoginPhoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="login-setting">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <div class="login">
      <el-button type="primary" @click="login">登入</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import loginAccount from './login-account.vue'
import loginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    loginAccount,
    loginPhone
  },
  setup() {
    const isKeepPassword = ref(true)
    const loginMethod = ref<string>('account')

    const LoginAccountRef = ref<InstanceType<typeof loginAccount>>()
    const LoginPhoneRef = ref<InstanceType<typeof loginPhone>>()

    const login = () => {
      if (loginMethod.value === 'account') {
        LoginAccountRef.value?.loginAction(isKeepPassword.value)
      } else {
        // console.log(LoginPhoneRef.value?)
      }
    }
    return {
      isKeepPassword,
      loginMethod,
      LoginAccountRef,
      LoginPhoneRef,
      login
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  transform: translateY(-50%);
  .title {
    text-align: center;
  }
  .login-setting {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  }
  .login {
    margin-top: 10px;
    & button {
      width: 100%;
    }
  }
}
</style>
