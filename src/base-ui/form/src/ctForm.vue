<template>
  <div class="nav-header">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="lableWidth" :model="modelValue" ref="elFormRef">
      <el-row>
        <template v-for="item in formItem" :key="item.lable">
          <el-col v-bind="cloLayout">
            <el-form-item
              :label="item.lable"
              :style="itemStyle"
              :rules="item.rules"
              :prop="item.field"
              v-if="item.isShow !== false"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :size="item.size"
                  :show-password="item.type === 'password'"
                  :placeholder="item.placeholder"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handlerChange($event, item.field)"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handlerChange($event, item.field)"
                >
                  <el-option
                    v-for="value in item.option"
                    :key="value.id"
                    :value="value.id"
                    :label="value.name"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'timePicker'">
                <el-date-picker
                  type="daterange"
                  start-placeholder="Start Date"
                  end-placeholder="End Date"
                  :default-value="[new Date(2021, 9, 1), new Date(2021, 10, 1)]"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handlerChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { ElForm, ElMessage } from 'element-plus'
import { defineComponent, PropType, ref } from 'vue'
import { IFormItem } from './type'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItem: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    lableWidth: {
      type: String,
      default: '60px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    cloLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // const formData = ref({ ...props.modelValue })
    // watch(
    //   formData,
    //   (newValue) => {
    //     emit('update:modelValue', newValue)
    //   },
    //   {
    //     deep: true
    //   }
    // )
    const elFormRef = ref<InstanceType<typeof ElForm>>()
    const isValidate = ref(true)
    const handlerChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [`${field}`]: value })
    }
    const handlerBlur = () => {
      elFormRef.value?.validate((isValid?: boolean, field?: any) => {
        if (isValid !== undefined) isValidate.value = isValid
        console.log(field)
        let messageItem: string[] = []
        for (const key in field) {
          for (const i of field[key]) {
            messageItem.push(i.message)
          }
        }
        const _recuse = (k: number) => {
          if (k < messageItem.length) {
            ElMessage({
              type: 'warning',
              message: messageItem[k++],
              duration: 1000,
              onClose: () => {
                _recuse(k)
              }
            })
          }
        }
        _recuse(0)
      })
    }

    const checkPassword = (rule: any, value: string, callback: any) => {
      const passwordData = props.modelValue['password']
      if (passwordData === value || !passwordData) {
        callback()
      } else if (!value) {
        callback(new Error('请再次输入您的密码'))
      } else if (passwordData !== value) {
        callback(new Error('两次输入的密码不一致'))
      }
    }
    const confirmPasswordItem = props.formItem.find(
      (item) => item.field === 'confirmPassword'
    )
    if (confirmPasswordItem) {
      confirmPasswordItem.rules?.push({
        validator: checkPassword,
        trigger: 'blur'
      })
    }
    return {
      // formData,
      handlerChange,
      elFormRef,
      handlerBlur,
      isValidate
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  padding-top: 22px;
  .footer {
    text-align: right;
    padding: 0 50px 30px;
  }
}
</style>
