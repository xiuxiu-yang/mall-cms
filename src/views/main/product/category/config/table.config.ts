import { ITableConfig } from '../../../system/type'

export const tableConfig: ITableConfig = {
  title: '商品分类',
  propData: [
    { prop: 'name', label: '类别', minWidth: '100' },
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
  pageName: 'category',
  pageTitle: '类别'
}
