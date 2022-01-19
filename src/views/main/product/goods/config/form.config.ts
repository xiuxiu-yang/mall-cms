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
      placeholder: '请输入商品名',
      lable: '商品名',
      field: 'name'
    },
    {
      type: 'input',
      lable: '价格',
      placeholder: '请输入价格',
      field: 'newPrice'
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
