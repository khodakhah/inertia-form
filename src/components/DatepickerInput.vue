<script setup lang="ts">

import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import {onMounted, PropType, ref, watch} from 'vue'
import {debounce} from "lodash";

const props = defineProps({
    modelValue: String,
    id: String,
    class: String,
    placeholder: {
      type: String,
      default: '',
    },
    minDate: {
      type: String || null,
      defualt: null,
    },
    maxDate: {
      type: String || null,
      defualt: null,
    },
    disabledDates: {
      type: Array as PropType<string[]>,
      default: [],
    },
    allowedDates: {
      type: Array as PropType<string[]>,
      default: [],
    },
    disabledWeekDays: {
      type: Array as PropType<string[]>,
      default: [],
    },
    onChange: Function
})

const emits = defineEmits(['update:modelValue'])

const genDate = (value?: string, defaultValue?: Date | null) => {
    if (value && value !== '') {
        return new Date(value)
    }

    return defaultValue ?? null
}

const date = ref(genDate(props.modelValue, null))
const placeholderRef = ref(props.placeholder)

const updateDate = (modelData: Date) => {
    date.value = modelData
    emits('update:modelValue', modelData?.toISOString() ?? '')
    if (props.onChange) {
      props.onChange(date.value)
    }
}

const textInputOptions = ref({
    format: 'dd.MM.yyyy'
})

const dateFormat = (date?: Date) => {
    if (!date) {
        return ''
    }
    const day = ('0' + (date.getDate())).slice(-2)
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const year = date.getFullYear()

    return `${day}.${month}.${year}`
}

const genDateList = (dates: string[]) => {
    if (dates && Array.isArray(dates) && dates.length > 0) {
        let res: Date[] = []
        dates.forEach(function (element: string) {
            res.push(genDate(element, null))
        })
        return res
    }
    return []
}

watch(() => props.modelValue, (value) => {
    date.value = genDate(value, null)
});
</script>
<template>
    <Datepicker v-model="date"
                @update:model-value="updateDate"
                :enable-time-picker="false"
                :format="dateFormat"
                text-input
                :text-input-options="textInputOptions"
                :min-date="genDate(minDate, null)"
                :max-date="genDate(maxDate, null)"
                :disabled-dates="genDateList(disabledDates)"
                :allowed-dates="genDateList(allowedDates)"
                :disabled-week-days="disabledWeekDays"
                :start-date="genDate(maxDate, null) ?? genDate(minDate, null) ?? genDate()"
                :prevent-min-max-navigation="genDate(minDate, null) && genDate(maxDate, null)"
                auto-apply>
        <template #dp-input="{ value, onInput, onEnter, onTab, onClear }">
            <input type="text" :value="value" :placeholder="placeholderRef" class="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"/>
        </template>
    </Datepicker>
  {{placeholderRef}}
</template>
