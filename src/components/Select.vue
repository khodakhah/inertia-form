<script setup lang="ts">
import { onMounted, ref, Ref, PropType } from 'vue';

defineProps({
    modelValue: String,
    options: Array as PropType<SelectOption[]>,
});

defineEmits(['update:modelValue']);

const input: Ref<HTMLInputElement | null> = ref(null);

</script>
<template>
    <select class="mt-1 block w-full border-gray-300 rounded" :value="modelValue" @change="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" ref="input">
        <template v-if="options">
            <option v-for="option in options" :value="option.value">{{option.label}}</option>
        </template>
    </select>
</template>
