import type {  Props } from "@/type/proTable"

export const defaultConfig: Required<Omit<Props, 'request' | 'columns' | 'rowKey'>> = {
  border: false,
  borderStyle: '1px solid #ebeef5',
  emptyText: '暂无数据',
  headerBackground: '#fafafc',
  pageSizes: [10, 20, 30, 40, 50],
  pageLayout: 'total, sizes, prev, pager, next, jumper',
  currentPage: 1
}
