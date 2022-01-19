export interface IPropData {
  prop: string
  label: string
  minWidth?: string
  slotName?: string
}
export interface ITableConfig {
  title: string
  showIndexColumn?: boolean
  showSelectColumn?: boolean
  propData: IPropData[]
  pageName: string
  pageTitle: string
  treeProps?: any
}
