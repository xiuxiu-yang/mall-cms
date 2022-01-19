import { ITableConfig } from '../../type'

export const tableConfig: ITableConfig = {
  title: '部门列表',
  propData: [
    { prop: 'name', label: '部门', minWidth: '100' },
    { prop: 'leader', label: '领导', minWidth: '100' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    {
      prop: 'handler',
      label: '操作',
      minWidth: '120',
      slotName: 'handler'
    }
  ],
  pageName: 'department',
  pageTitle: '部门'
}
