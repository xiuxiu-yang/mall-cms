<template>
  <div>
    <el-form label-width="70px" :rules="rules" :model="phone">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input placeholder="请输入验证码" v-model="phone.code"></el-input>
          <el-button type="primary" size="mini">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const phone = reactive({
      num: '',
      code: ''
    })

    const rules = {
      num: [
        {
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        },
        {
          pattern: /^[0-9]{11}$/,
          message: '请输入正确的手机号',
          trigger: 'blur'
        }
      ],
      code: []
    }
    return {
      phone,
      rules
    }
  }
})
</script>

<style scoped lang="less">
.get-code {
  display: flex;

  & button {
    margin-left: 8px;
  }
}
</style>
