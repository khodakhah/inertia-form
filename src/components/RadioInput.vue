<script setup lang="ts">
import { ref, Ref, PropType } from 'vue'
import type {SelectOption} from "@/interfaces";

const props = defineProps({
  id: String,
  modelValue: String,
  options: {
    type: Array as PropType<SelectOption[]>,
    default: [],
  },
})

const emit = defineEmits(['update:modelValue'])

const selectRadioOption = (option: SelectOption) => {
  emit('update:modelValue', option.value)
}
</script>

<template>
  <template v-for="(option, index) in options">
    <input
        :id="id + '-' + index"
        :name="id"
        type="radio"
        :value="option.value"
        ref="input"
        @keyup="selectRadioOption(option)"
        @change="selectRadioOption(option)" :checked="option.value === modelValue"/>
    <label :for="id + '-' + index" class="px-3">{{ option.label }}</label>
  </template>
</template>