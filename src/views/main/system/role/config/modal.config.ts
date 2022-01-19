import { IForm } from '@/base-ui/form/src/type'
export const modalConfig: IForm = {
  cloLayout: {
    span: 24
  },
  formItem: [
    {
      type: 'input',
      placeholder: '请输入用户名',
      lable: '角色名',
      field: 'name'
    },
    {
      type: 'input',
      lable: '角色介绍',
      placeholder: '请输入角色介绍',
      field: 'intro'
    }
  ],
  lableWidth: '120px',
  pageName: 'role',
  title: '角色',
  itemStyle: {}
}
