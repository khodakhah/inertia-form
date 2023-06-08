<template>
    <h2 class="text-3xl mb-4">Native form elements</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="mb-4">
            <p class="mb-2">Passing the following object as input to form will build a browser native input.</p>
            <p class="mb-2">Browser native form element is the simple HTML element for a browser that can be compiled as form input.</p>
            <p class="mb-2">Different native element can be defined only with property "<strong>type</strong>". For example: <code class="bg-gray-200 rounded-lg px-2 py-1">type: "email"</code>.</p>
            <p>Bellow you can find all supported elements.</p>
        </div>
        <div class="mb-4"><Code>{{ inputs[0] }}</Code></div>
    </div>
    <h3 class="text-2xl mb-4">All supported elements</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="mb-4 p-4 border rounded-lg" v-for="(input, key) in inputs">
            <div class="mb-3">Type: <code class="bg-gray-200 rounded-lg px-2 py-1">{{input.type}}</code></div>
            <FormInput :form="forms[key]" :input="input"/>
        </div>
    </div>
</template>
<script setup>
import inputs from './../examples/inputs.js'
import FormInput from "@/components/FormInput.vue";
import Code from "../Components/Code.vue";
import {useForm} from "@inertiajs/vue3";
const forms = [], formValues = []
inputs.forEach(function (item, key) {
    formValues[key] = {}
    formValues[key][item.key] = ''
    forms[key] = useForm(formValues[key])
})
</script>
