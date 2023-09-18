<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  pageSize: number
  total: number
  pageSizes: number[]
  layout: string
}>()

const emit = defineEmits<{
  (e: 'handleCurrentChange', v: number): void
  (e: 'handleSizeChange', v: number): void
}>()

const handleSizeChange = (val: number) => {
  emit('handleSizeChange', val)
}
const handleCurrentChange = (val: number) => {
  emit('handleCurrentChange', val)
}
</script>

<template>
  <el-pagination
    class="pagination"
    :current-page="props.currentPage"
    :page-size="props.pageSize"
    :page-sizes="props.pageSizes"
    :layout="props.layout"
    :total="props.total"
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<style scoped lang="scss">
.pagination {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
}
</style>
