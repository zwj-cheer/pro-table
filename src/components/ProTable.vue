<script setup lang="ts">
import type { Columns, Data, Props } from "@/type/proTable"
import { computed } from "vue"
import { defaultConfig } from "@/config/protable"
import { isUndefined, omitBy, orderBy } from "lodash"
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const props = defineProps<Props>()
const injectData = inject<Partial<Props>>('pro-table',{})

const config = computed<Required<Props>>(() => ({
  ...defaultConfig,
  ...injectData,
  ...omitBy(props, isUndefined)
} as Required<Props>))

const _border = computed(() => {
  if (config.value.border) {
    return config.value.borderStyle
  }

  return '0'
})

const pageInfo = ref({
  currentPage: config.value.currentPage,
  pageSize: 10,
  total: 0,
})

const handleSizeChange = (val: number) => {
  pageInfo.value.pageSize = val
  genDisplayData()
}
const handleCurrentChange = (val: number) => {
  pageInfo.value.currentPage = val
  genDisplayData()
}

const data = ref<Data>([])
const displayData = ref<Data>([])
const error = ref<string>()
const loading = ref<boolean>(false)
const _request = async (): Promise<void> => {
    try {
      loading.value = true
      error.value = undefined
      const result = await props.request()
      data.value = result.data
      pageInfo.value.total = result.total ?? result.data.length
      genDisplayData()
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
}
onMounted(_request)

const sortColumns = ref<Columns>([])
const sortChange = (c: Columns): void => {
  sortColumns.value = c
  genDisplayData()
}

function genDisplayData (): void {
  let result: Data = data.value

  if (sortColumns.value.length) {
    const v = sortColumns.value.reduce<string[][]>((p, c) => {
      const [keys, orders] = p
      return [[...keys, c.key], [...orders, c.sortable as string]]
    }, [[], []])

    result = orderBy(data.value, ...v)
  }

  const start = (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize
  displayData.value = result.slice(start, pageInfo.value.pageSize + start)
}
</script>

<template>
  <div class="pro-table">
    <el-config-provider :locale="zhCn">
      <table
        v-loading="loading"
        class="table"
      >
        <ProTableHeader
          :columns="config.columns"
          @sort-change="sortChange"
        >
          <template #table-header="{ column }">
            <slot :name="`_header-${column.key}`">
              {{ column.title }}
            </slot>
          </template>
        </ProTableHeader>
        <ProTableRow
          v-for="item in displayData"
          :key="props.rowKey ? item[props.rowKey] : data.indexOf(item)"
          :columns="config.columns"
          :record="item"
        >
          <template #default="{column}">
            <slot
              :column="column"
              :record="item"
              :name="column.key"
              :index="data.indexOf(item)"
            >
              {{ item[column.key] }}
            </slot>
          </template>
        </ProTableRow>
      </table>
      <pro-table-empty
        v-if="!displayData.length"
        :empty-text="config.emptyText"
      />
      <pro-pagination
        v-bind="pageInfo"
        :layout="config.pageLayout"
        :page-sizes="config.pageSizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-config-provider>
  </div>
</template>
<style lang="scss" scoped>
.pro-table {
  $border-style: v-bind(_border);

  .table {
    width: 100%;
    border-left-width: 0;
    border-bottom: $border-style;
    border-right: $border-style;
    border-top: $border-style;
    table-layout: fixed;
    border-collapse: collapse;
    color: #333333;
    font-size: 14px;

    tr,:deep(tr) {
      &:hover {
        td {
          background: #f5f7fa;
        }
      }

      th,
      td {
        padding: 8px 0 8px 0;
        border-bottom: v-bind('config.borderStyle');
        border-left: $border-style;
        text-align: left;
      }

      th {
        background: v-bind('config.headerBackground');
      }
    }
  }
}
</style>
