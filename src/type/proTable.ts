export type Order = 'asc' | 'desc' | boolean

export interface Column {
  title: string
  key: string
  sortable?: Order
}


export type Columns = Column[]


export type RowData = Record<string, any>

export type Data = RowData[]

export interface RequestResult {
  data: Data,
  total?: number
}

export type Request = () => Promise<RequestResult>


export interface Props {
  columns: Columns
  request: Request
  rowKey?: string
  // 表格样式
  border?: boolean
  borderStyle?: string
  headerBackground?: string
  emptyText?: string
  // 分页
  pageSizes?: number[]
  pageLayout?: string
  currentPage?: number
}
