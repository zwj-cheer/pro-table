<script setup lang="ts">
import type { Filters } from "@/type/proTable"

const props = withDefaults(
  defineProps<{
    filters?: Filters
  }>(),
  {
    filters: []
  }
)
</script>

<template>
  <div class="pro-table-filter">
    <ul
      v-for="item in props.filters"
      :key="item.value"
    >
      <li>{{ item.label }}</li>
      <li>
        <pro-multi-view v-model="item.value" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss"></style>
