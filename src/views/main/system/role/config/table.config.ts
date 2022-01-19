import { ITableConfig } from '../../type'

export const tableConfig: ITableConfig = {
  title: '角色列表',
  showIndexColumn: true,
  showSelectColumn: true,
  propData: [
    { prop: 'name', label: '用户名', minWidth: '100' },
    { prop: 'intro', label: '权限', minWidth: '100' },
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
  pageName: 'role',
  pageTitle: '角色'
}
