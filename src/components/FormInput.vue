<script setup lang="ts">
import InputLabel from "./InputLabel.vue";
import InputError from "./InputError.vue";
import TextInput from "./TextInput.vue";
import TextareaInput from "./TextareaInput.vue";
import Select from "./Select.vue";
import {PropType, ref, watch} from "vue";
import {debounce} from "lodash";
import Checkbox from "./Checkbox.vue";
import DatepickerInput from "./DatepickerInput.vue";

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
    input: Object as PropType<Input>,
    form: Object,
    focus: {
        type: Boolean,
        default: false,
    },
    options: Array,
    onChange: {
        type: Function,
        default: (value) => {
        }
    },
})

let value = ref(props.form[props.input.key])
if (typeInInputs.includes(props.input.type)) {
    watch(value, debounce((val) => {
        props.onChange(val)
    }, 300))
}
</script>
<template>
    <hr v-if="Object.keys(input).length === 0" class="border-gray-200 dark:border-gray-700"/>
    <template v-else>
        <template v-if="input.type === 'checkbox'">
            <Checkbox
                :id="input.key"
                :type="input.type"
                v-model="form[input.key]"
                :checked="input.default"
                :on-change="onChange"
                @change="onChange"/>
            <label :for="input.key" class="ml-2 text-sm text-gray-600">{{input.label}}</label>
        </template>
        <div v-else-if="['radio'].includes(input.type)" class="flex items-center">
            <input
                :id="input.key"
                :type="input.type"
                v-model="form[input.key]"
                @keyup="value = form[input.key]"
                @change="value = form[input.key]"/>
            <label :for="input.key" class="px-3">{{ input.label }}</label>
        </div>
        <InputLabel v-else :for="input.key" :value="input.label"/>
        <TextInput v-if="[
                    'text',
                    'password',
                    'email',
                    'number',
                    'url',
                    // 'date',
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
        <DatepickerInput v-else-if="input.type === 'date'"
                         :id="input.key"
                         class="mt-1"
                         :min-date="input.min"
                         :max-date="input.max"
                         :placeholder="input.placeholder"
                         :allowed-dates="input.allowed"
                         :disabled-dates="input.disabled"
                         :disabled-week-days="input.disabledWeekDays"
                         :on-change="onChange"
                         v-model="form[input.key]"/>

        <div class="relative" v-if="input.type === 'ndate'">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
            </div>
            <input datepicker="" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input" placeholder="Select date">
        </div>
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
                :options="options ? options : input.options ?? []"
                v-model="form[input.key]"
                :autofocus="focus"
                @change="onChange(form[input.key])"/>
        <InputError class="mt-2" :message="form.errors[input.key]"/>
    </template>
</template>
