export interface IFormItem {
  type: 'input' | 'select' | 'timePicker' | 'password'
  size?: 'small' | 'mini' | 'medium'
  placeholder?: string
  lable: string
  option?: { id: number; name: string }[]
  value?: string
  field: string
  rules?: any[]
  isShow?: boolean
}
export interface IForm {
  lableWidth?: string
  formItem: IFormItem[]
  itemStyle?: any
  // eslint-disable-next-line @typescript-eslint/ban-types
  rules?: {}
  cloLayout: {
    sm?: number
    xl?: number
    md?: number
    lg?: number
    xs?: number
    span?: number
  }
  pageName?: string
  title?: string
}
