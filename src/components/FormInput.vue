<script setup lang="ts">
import {PropType, ref, watch} from "vue";
import {debounce} from "lodash";
import type {Input, InputDate, InputSelect, SelectOption} from "@/interfaces";
import InputLabel from "@/components/InputLabel.vue";
import InputError from "@/components/InputError.vue";
import TextInput from "@/components/TextInput.vue";
import TextareaInput from "@/components/TextareaInput.vue";
import Select from "@/components/Select.vue";
import RadioInput from "@/components/RadioInput.vue";
import Checkbox from "@/components/Checkbox.vue";
import DatepickerInput from "@/components/DatepickerInput.vue";

const typeInInputs = [
    'textarea',
    'text',
    'password',
    'email',
    'number',
    'url',
    'date',
    'datetime-local',
    'month',
    'week',
    'time',
    'search',
    'tel',
];

const props = defineProps({
    input: {
      type: Object as PropType<Input | InputSelect | InputDate>,
      required: true,
    },
    form: {
      type: Object,
      required: true
    },
    focus: {
        type: Boolean,
        default: false,
    },
    options: {
      type: Array as PropType<SelectOption[]>,
      default: [],
    },
    onChange: {
        type: Function,
        default: (value: string) => {
        }
    },
})

const value = ref()
if (typeof props.form !== 'undefined' && typeof props.input !== 'undefined') {
  value.value = props.form[props.input.key]

  if (typeInInputs.includes(props.input.type)) {
    watch(value, debounce((val) => {
      props.onChange(val)
    }, 300))
  }
}
</script>
<template>
    <template v-if="typeof input !== 'undefined'">
      <hr v-if="Object.keys(input).length === 0" class="border-gray-200 dark:border-gray-700"/>
      <template v-else>
        <template v-if="input.type === 'checkbox'">
          <Checkbox
              :id="input.key"
              :type="input.type"
              v-model="form[input.key]"
              :checked="Boolean(input.default)"
              :on-change="onChange"
              @change="onChange"/>
          <label :for="input.key" class="ml-2 text-sm text-gray-600">{{input.label}}</label>
        </template>
        <InputLabel v-else :for="input.key" :value="input.label"/>
        <TextInput v-if="[
                    'text',
                    'password',
                    'email',
                    'number',
                    'url',
                    'date',
                    'datetime-local',
                    'month',
                    'week',
                    'time',
                    'search',
                    'tel',
                    ].includes(input.type)"
                   :id="input.key"
                   :type="input.type"
                   :placeholder="input.placeholder"
                   v-model="form[input.key]"
                   @keyup="value = form[input.key]"
                   @change="value = form[input.key]"
                   class="mt-1 block w-full"
                   :required="input.required"
                   :autofocus="focus"
        />
        <TextareaInput v-else-if="input.type === 'textarea'"
                       :id="input.key"
                       :type="input.type"
                       v-model="form[input.key]"
                       class="mt-1 block w-full"
                       :required="input.required"
                       :autofocus="focus"
                       @keyup="value = form[input.key]"
                       @change="onChange(form[input.key])"/>
        <Select v-else-if="input.type === 'select'"
                :id="input.key"
                :options="options.length > 0 ? options : ('options' in input ? input.options : [])"
                v-model="form[input.key]"
                :autofocus="focus"
                @change="onChange(form[input.key])"/>
        <RadioInput v-else-if="['radio'].includes(input.type)"
                    :id="input.key"
                    :options="options.length > 0 ? options : ('options' in input ? input.options : [])"
                    v-model="form[input.key]"/>
        <DatepickerInput v-else-if="input as InputDate && input.type === 'datepicker'"
                         :id="input.key"
                         class="mt-1"
                         :min-date="('min' in input) ? input.min : null"
                         :max-date="('max' in input) ? input.max : null"
                         :placeholder="input?.placeholder ?? ''"
                         :allowed-dates="('allowed' in input) ? input.allowed : []"
                         :disabled-dates="('disabled' in input) ? input.disabled : []"
                         :disabled-week-days="('disabledWeekDays' in input) ? input.disabledWeekDays : []"
                         :on-change="onChange"
                         v-model="form[input.key]"/>
        <InputError class="mt-2" :message="form.errors[input.key]"/>
      </template>
    </template>
</template>
