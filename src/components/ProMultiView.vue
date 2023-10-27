<script setup lang="ts">
import type { Key, MultiViewOptions, MultiViewType } from "@/type/proTable"

const props = withDefaults(
  defineProps<{
    type?: MultiViewType;
    moduleValue: Key;
    options?: MultiViewOptions;
  }>(),
  {
    type: "text",
    options: [],
  }
)

const emit = defineEmits<{ (e: "update:modelValue", v: Key) }>()

const handleChange = (v: Key): void => {
  emit("update:modelValue", v)
}
</script>

<template>
  <el-input
    v-if="props.type === 'input'"
    :model-value="props.moduleValue"
    @change="handleChange"
  />
  <el-input-number
    v-if="props.type === 'inputNumber'"
    :model-value="props.moduleValue"
    @change="handleChange"
  />
  <el-radio-group
    v-if="props.type === 'radio'"
    :model-value="props.moduleValue"
    @change="handleChange"
  >
    <el-radio
      v-for="item in props.options"
      :key="item.value"
      :label="item.value"
    >
      {{ item.label }}
    </el-radio>
  </el-radio-group>
  <el-select
    v-if="props.type === 'select'"
    :model-value="props.moduleValue"
    @change="handleChange"
  >
    <el-option
      v-for="item in props.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <el-switch
    v-if="props.type === 'switch'"
    :model-value="props.moduleValue"
    @change="handleChange"
  />
  <el-time-picker
    v-if="props.type === 'timePicker'"
    :model-value="props.moduleValue"
    @change="handleChange"
  />
  <el-time-picker
    v-if="props.type === 'timeSelect'"
    :model-value="props.moduleValue"
    @change="handleChange"
  />
</template>
