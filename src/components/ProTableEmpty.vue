<script setup lang="ts">
const props = defineProps< { emptyText: string  }>()
</script>

<template>
  <el-empty
    :description="props.emptyText"
  />
</template>
