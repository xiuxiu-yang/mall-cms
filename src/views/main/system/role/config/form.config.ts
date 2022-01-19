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
      placeholder: '请输入权限',
      lable: '权限',
      field: 'intro'
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
