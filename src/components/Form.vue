<script setup lang="ts">
import {useForm} from '@inertiajs/vue3';
import PrimaryButton from "./PrimaryButton.vue";
import FormInput from "./FormInput.vue";
import {PropType} from "vue";
import { Input } from '@/interfaces'

const props = defineProps({
  inputs: Object as PropType<{
    [key: string]: Input
  }>,
  action: {
    type: String,
    default: '',
  },
  method: {
    type: String,
    default: '',
  },
  layout: Array,
  onFinish: Function,
  staticErrors: Object,
  reset: {
    type: Boolean,
    default: true,
  },
})

const firstKey: string = typeof props.inputs !== 'undefined' ? Object.keys(props.inputs)[0] : ''

const getFormData = () => {
  if (typeof props.inputs === 'undefined') {
    return
  }
  let data: { [key: string]: string } = {}
  for (let input in props.inputs) {
    data[props.inputs[input].key] = props.inputs[input].default ?? ''
  }
  return data
}

const form = useForm(getFormData() ?? {})

if (props.staticErrors) {
  form.errors = props.staticErrors
}

const submit = () => {
  if (props.method === 'put') {
    form.put(props.action, {
      onFinish: () => {
        if (props.onFinish) {
          props.onFinish(form, getFormData())
        }
      },
      onSuccess: () => {
        form.defaults(getFormData() ?? {})
        if (props.reset) {
          form.reset()
        }
      }
    })
    return;
  }
  form.post(props.action, {
    onFinish: () => {
      if (props.onFinish) {
        props.onFinish(form, getFormData())
      }
    },
    onSuccess: () => {
      form.defaults(getFormData() ?? {})
      if (props.reset) {
        form.reset()
      }
    }
  })
}

defineExpose({
  form
})
</script>

<template>
  <form class="w-full" @submit.prevent="submit">
    <slot name="inputs" :inputs="inputs" :form="form">
      <slot v-for="input in inputs" :name="input.key" :input="input" :form="form" :focus="input.key === firstKey">
        <div class="w-full mb-6">
          <FormInput :input="input" :form="form" :focus="input.key === firstKey"/>
        </div>
      </slot>
    </slot>
    <slot name="submit" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
      <PrimaryButton>
        Submit
      </PrimaryButton>
    </slot>
  </form>
</template>
