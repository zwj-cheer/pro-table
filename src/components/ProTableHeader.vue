<script setup lang="ts">
import type { Column, Columns, Order } from "@/type/proTable"
import { cloneDeep, isUndefined } from "lodash"

const props = defineProps<{ columns: Columns }>()
const emit = defineEmits<{
  (e: 'sort-change', v: Columns): void
}>()

const _columns = ref(cloneDeep(props.columns))
const sortColumns = ref<Columns>([])

const sortChange = (column: Column): void => {
  if (typeof column.sortable === "boolean") {
    sortColumns.value = sortColumns.value.filter((item) => item.key !== column.key)
  } else if (sortColumns.value.indexOf(column) === -1) {
    sortColumns.value.push(column)
  }

  emit('sort-change', sortColumns.value)
}

_columns.value.forEach((item) => {
  if (item.sortable === 'asc' || item.sortable === 'desc'){
    sortChange(item)
  }
})

const handleTh = (column: Column): void => {
  if (isUndefined(column.sortable)) {
    return
  }

  if (column.sortable === "asc") {
    column.sortable = "desc"
  } else if (column.sortable === "desc") {
    column.sortable = true
  } else {
    column.sortable = "asc"
  }

  sortChange(column)
}

const handleSort = (sortable: Order, column: Column): void => {
  if (sortable === column.sortable) {
    column.sortable = true
  } else {
    column.sortable = sortable
  }

  sortChange(column)
}
</script>

<template>
  <tr class="header-row">
    <th
      v-for="item in _columns"
      :key="item.key"
      :class="item.sortable ? item.sortable : ''"
      :style="{width: item.width}"
      @click="handleTh(item)"
    >
      <div class="header-row-display">
        <slot
          name="table-header"
          :column="item"
        >
          {{ item.title }}
        </slot>
        <div
          v-if="item.sortable !== undefined"
          class="sort-icon-box"
        >
          <i
            class="sort-caret ascending"
            @click.stop="handleSort('asc', item)"
          />
          <i
            class="sort-caret descending"
            @click.stop="handleSort('desc', item)"
          />
        </div>
      </div>
    </th>
  </tr>
  <!--  <tr>-->
  <!--    <th>1sdf</th>-->
  <!--    <th>1sdf</th>-->
  <!--  </tr>-->
</template>

<style scoped lang="scss">
.header-row {
  .header-row-display {
    display: flex;
    align-items: center;

    .sort-icon-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 14px;
      width: 24px;
      position: relative;

      .sort-caret {
        width: 0;
        height: 0;
        border: solid 5px transparent;
        position: absolute;
        left: 7px;
        cursor: pointer;
      }

      .ascending {
        border-bottom-color: var(--el-text-color-placeholder);
        top: -5px;
      }

      .descending {
        border-top-color: var(--el-text-color-placeholder);
        bottom: -3px;
      }
    }
  }

  .asc {
    .ascending {
      border-bottom-color: #409eff !important;
    }
  }

  .desc {
    .descending {
      border-top-color: #409eff !important;
    }
  }
}
</style>
