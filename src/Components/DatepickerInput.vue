<script setup>

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

const genDate = (value, defaultValue) => {
    if (value !== undefined && typeof value === 'string' && value !== '') {
        return new Date(value)
    }

    if (defaultValue !== undefined) {
        return defaultValue
    }

    return new Date()
}

const date = ref(genDate(props.modelValue, null))

const updateDate = (modelData) => {
    date.value = modelData
    emits('update:modelValue', modelData?.toISOString() ?? '')
    props.onChange(date.value)
}

const textInputOptions = ref({
    format: 'dd.MM.yyyy'
})

const dateFormat = (date) => {
    if (typeof date !== "object") {
        return ''
    }
    const day = ('0' + (date.getDate())).slice(-2)
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const year = date.getFullYear()

    return `${day}.${month}.${year}`
}

const genDateList = (dates) => {
    if (dates && Array.isArray(dates) && dates.length > 0) {
        let res = []
        dates.forEach(function (element) {
            let newDate = genDate(element, null);
            if (newDate !== null) {
                res.push(newDate)
            }
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
