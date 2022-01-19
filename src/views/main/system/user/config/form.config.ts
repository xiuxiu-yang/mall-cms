import { IForm } from '@/base-ui/form/src/type'
export const formConfig: IForm = {
  cloLayout: {
    xl: 6,
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24
  },
  formItem: [
    {
      type: 'input',
      placeholder: '请输入用户名',
      lable: '用户名',
      field: 'name'
    },
    {
      type: 'input',
      lable: '姓名',
      placeholder: '请输入姓名',
      field: 'realname'
    },
    {
      type: 'input',
      lable: '电话号码',
      placeholder: '请输入电话号码',
      field: 'cellphone'
    },
    {
      type: 'timePicker',
      lable: '创建时间',
      field: 'createAt'
    }
  ],
  lableWidth: '120px',
  itemStyle: { padding: '10px 40px' }
}
