<script setup lang="ts">
import type { Columns } from "@/type/proTable"

const columns: Columns = [
  {
    title: '名称',
    key: 'name',
    sortable: true,
  },
  { key: 'sex',
    title: '性别',
    sortable: true
  },
  {
    key: 'age',
    title: '年龄',
    sortable: 'desc'
  },
  {
    key: 'hobby',
    title: '爱好'
  },
  {
    key: 'active',
    title: '操作'
  }
]

const request = () => Promise.resolve({
  data: Array.from({length: 30},
    (_item, index) => ({name: `test-${index}`, sex: index % 2 === 0 ? '女' : '男', age: index, hobby: '骑车'})
  )
})
</script>

<template>
  <div>
    <pro-table
      :columns="columns"
      :request="request"
      row-key="name"
    >
      <template #active="{index}">
        <el-button type="danger">
          删除-{{ index }}
        </el-button>
      </template>
    </pro-table>
    <RouterView />
  </div>
</template>
