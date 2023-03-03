<script setup>
import { onMounted, ref } from 'vue';

defineProps({
    modelValue: String,
    options: Array,
});

defineEmits(['update:modelValue']);

const input = ref(null);

</script>
<template>
    <select class="mt-1 block w-full border-gray-300 rounded" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)" ref="input">
        <template v-if="options">
            <option v-for="option in options" :value="option.value">{{option.label}}</option>
        </template>
    </select>
</template>
