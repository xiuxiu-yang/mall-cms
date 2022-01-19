import { ITableConfig } from '../../type'

export const tableConfig: ITableConfig = {
  title: '菜单列表',
  propData: [
    { prop: 'name', label: '权限名', minWidth: '100' },
    { prop: 'url', label: 'url', minWidth: '100' },
    { prop: 'icon', label: 'icon', minWidth: '100' },
    { prop: 'permission', label: '权限', minWidth: '100' },
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
  pageName: 'menu',
  pageTitle: '菜单',
  treeProps: {
    children: 'children',
    hasChildren: 'hasChildren'
  }
}
