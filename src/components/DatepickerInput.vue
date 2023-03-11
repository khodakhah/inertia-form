<script setup lang="ts">

import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import {onMounted, ref, watch} from 'vue'
import {debounce} from "lodash";

const props = defineProps({
    modelValue: String,
    minDate: String,
    maxDate: String,
    disabledDates: Array,
    allowedDates: Array,
    disabledWeekDays: Array,
    onChange: Function
})

const emits = defineEmits(['update:modelValue'])

const genDate = (value?: string, defaultValue?: Date | null) => {
    if (value && value !== '') {
        return new Date(value)
    }

    if (defaultValue) {
        return defaultValue
    }

    return new Date()
}

const date = ref(genDate(props.modelValue, null))

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
                prevent-min-max-navigation
                auto-apply>
        <template #dp-input="{ value, onInput, onEnter, onTab, onClear }">
            <input type="text" :value="value" class="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"/>
        </template>
    </Datepicker>
</template>
