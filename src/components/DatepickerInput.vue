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

function createDateFromCustomFormat(dateString: string, format: string): Date | null {
  const formatParts: string[] = format.toLowerCase().split(/[^a-z]+/);
  const valueParts: string[] = dateString.split(/[^0-9]+/);

  const dateValues: { [key: string]: number } = {};
  for (let i = 0; i < formatParts.length; i++) {
    const formatPart: string = formatParts[i];
    const valuePart: number = parseInt(valueParts[i], 10);
    dateValues[formatPart] = valuePart;
  }

  const year: number = dateValues['yyyy'];
  const month: number = dateValues['mm'] - 1; // Months are zero-based in JavaScript Date object
  const day: number = dateValues['dd'];

  // Check if the values are valid
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return null;
  }

  const date: Date = new Date(year, month, day);

  // Validate the date
  if (
      date.getFullYear() !== year ||
      date.getMonth() !== month ||
      date.getDate() !== day
  ) {
    return null;
  }

  return date;
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

const date = ref(genDate(props.modelValue, null))
const dateInput = ref(date.value ? dateFormat(date.value) : null)
const placeholderRef = ref(props.placeholder)

const updateDate = (modelData: Date) => {
  date.value = modelData
  dateInput.value = dateFormat(date.value)
  emits('update:modelValue', modelData?.toISOString() ?? '')
  if (props.onChange) {
    props.onChange(date.value)
  }
}

const updateDateByValue = (value: string) => {
  const date = createDateFromCustomFormat(value, textInputOptions.value.format)
  if (date) {
    updateDate(date)
  }
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
watch(dateInput, debounce((value) => {
  if (typeof value === 'string' && value !== '') {
    updateDateByValue(value)
  }
}, 500));
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
      <input v-model="dateInput" type="text" :id="id" :placeholder="placeholderRef" :class="class"
             class="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"/>
    </template>
  </Datepicker>
</template>
