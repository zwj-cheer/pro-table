export type Order = 'asc' | 'desc' | true

export type MultiViewType = 'input' | 'inputNumber' | 'radio' | 'select' | 'switch' | 'timePicker' | 'timeSelect' | 'text'

export type Key = string | number | boolean

export interface MultiViewOption {
  value: Key | [Date, Date] | [number, number] | [string, string]
  label: Key
  [P: string]: any
}

export type MultiViewOptions = MultiViewOption[]

export interface Filter {
  value?: Key | [Date, Date] | [number, number] | [string, string]
  label: Key
  type?: MultiViewType
  [P: string]: any
}

export type Filters = Filter[]

export interface Column {
  title: string
  key: string
  sortable?: Order
  width?: string
  filters: Filter
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
