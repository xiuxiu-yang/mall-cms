import { ITableConfig } from '../../../system/type'

export const tableConfig: ITableConfig = {
  title: '商品列表',
  showIndexColumn: true,
  showSelectColumn: true,
  propData: [
    { prop: 'name', label: '商品名', minWidth: '100' },
    { prop: 'oldPrice', label: '原价格', minWidth: '100' },
    { prop: 'newPrice', label: '折后价', minWidth: '100' },
    { prop: 'imgUrl', label: '图片', minWidth: '100', slotName: 'imgUrl' },
    { prop: 'status', label: '状态', minWidth: '100', slotName: 'state' },
    {
      prop: 'inventoryCount',
      label: '库存',
      minWidth: '100'
    },
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
  pageName: 'goods',
  pageTitle: '商品'
}
