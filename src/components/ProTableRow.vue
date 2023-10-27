<script setup lang="ts">
import type { Columns, RowData } from "@/type/proTable"

const props = defineProps<{
  record: RowData,
  columns: Columns
}>()

</script>

<template>
  <tr>
    <td
      v-for="item in props.columns"
      :key="item.key"
      :style="{width: item.width}"
    >
      <slot :column="item">
        {{ props.record[item.key] }}
      </slot>
    </td>
  </tr>
</template>

<style scoped lang="scss"></style>
