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
      v-for="c in props.columns"
      :key="c.key"
    >
      <slot :column="c">
        {{ props.record[c.key] }}
      </slot>
    </td>
  </tr>
</template>

<style scoped lang="scss"></style>
