<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    border?: boolean
    borderStyle?: string
  }>(),
  {
    border: true,
    borderStyle: '1px solid #ebeef5',
  }
)

const _border = computed(() => {
  if (props.border) {
    return props.borderStyle
  }

  return '0'
})
</script>

<template>
  <table class="table-rendering">
    <tr>
      <th>1sdf</th>
      <th>1sdf</th>
      <th>1sdf</th>
    </tr>
    <tr>
      <td>2</td>
      <td>2</td>
      <td>2</td>
    </tr>
  </table>
</template>
<style lang="scss" scoped>
.table-rendering {
  $border-style: v-bind('props.borderStyle');

  width: 100%;
  border: v-bind(_border);
  table-layout: fixed;
  border-collapse: collapse;
  color: #333333;
  font-size: 14px;

  tr {
    &:hover {
      td {
        background: #f5f7fa;
      }
    }

    th,
    td {
      padding: 8px 0 8px 0;
      border-bottom: $border-style;
      border-left: v-bind(_border);
      text-align: center;

      &:first-child {
        border-left: 0;
      }
    }

    th {
      background: #fafafc;
    }
  }
}
</style>
