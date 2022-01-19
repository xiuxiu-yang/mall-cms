import { IForm } from '@/base-ui/form/src/type'
export const modalConfig: IForm = {
  cloLayout: {
    span: 24
  },
  formItem: [
    {
      type: 'input',
      placeholder: '请输入用户名',
      lable: '用户名',
      field: 'name',
      rules: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }
      ]
    },
    {
      type: 'input',
      lable: '真实姓名',
      placeholder: '请输入真实姓名',
      field: 'realname',
      rules: [
        {
          required: true,
          message: '请输入真实姓名',
          trigger: 'blur'
        }
      ]
    },
    {
      type: 'password',
      lable: '密码',
      placeholder: '请输入密码',
      field: 'password',
      isShow: false,
      rules: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      ]
    },
    {
      type: 'password',
      lable: '确认密码',
      placeholder: '请再次输入密码',
      field: 'confirmPassword',
      isShow: false,
      rules: [
        {
          required: true,
          message: '请再次输入密码',
          trigger: 'blur'
        }
      ]
    },
    {
      type: 'input',
      lable: '电话号码',
      placeholder: '请输入电话号码',
      field: 'cellphone',
      rules: [
        {
          required: true,
          message: '请输入电话号码',
          trigger: 'blur'
        }
      ]
    },
    {
      type: 'select',
      lable: '所属部门',
      placeholder: '请选择所属部门',
      field: 'departmentId',
      option: [],
      rules: [
        {
          required: true,
          message: '请选择所属部门',
          trigger: 'blur'
        }
      ]
    },
    {
      type: 'select',
      lable: '角色权限',
      placeholder: '请选择对应的角色权限',
      field: 'roleId',
      option: [],
      rules: [
        {
          required: true,
          message: '请选择对应的角色权限',
          trigger: 'blur'
        }
      ]
    }
  ],
  lableWidth: '120px',
  itemStyle: {},
  pageName: 'users',
  title: '用户'
}
