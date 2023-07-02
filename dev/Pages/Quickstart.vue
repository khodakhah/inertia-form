<template>
  <h1 class="text-3xl mb-3">Quickstart</h1>
  <p class="mb-2">Here you can find out how works the package.</p>
  <h2 class="text-2xl mb-3">Install</h2>
  <Code lang="javascript" class="mb-4">
    npm install khodakhah/inertia-form
  </Code>

  <h2 class="text-3xl mb-4">Usage</h2>
  <p class="mb-2">By component <strong>InertiaForm</strong> you can define a form. You need only pass list of
    inputs.</p>
  <Code class="mb-2">{{ '<InertiaForm :inputs="inputs"/>' }}</Code>
  <p>The element have bellow properties to configure your form:</p>
  <ul class="ul">
    <li>submitLabel</li>
    <li>inputs</li>
    <li>action</li>
    <li>method</li>
    <li>onFinish</li>
    <li>staticErrors</li>
    <li>reset</li>
  </ul>
  <h2 class="text-3xl mb-4">Inputs</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="mb-4">
      <p class="mb-2">Passing the following object as input to form will build an input.</p>
      <p class="mb-2">Different elements can be defined only with property "<strong>type</strong>".</p>
      <p>For example: <code class="bg-gray-200 rounded-lg px-2 py-1">type: "email"</code>.</p>
      <p>Bellow you can find all supported elements.</p>
    </div>
    <div class="mb-4"><Code>{{ sampleInput }}</Code></div>
  </div>
  <p>Currently, following types are supported:</p>
  <ul class="inline-flex space-x-4">
    <li class="font-bold">text</li>
    <li class="font-bold">email</li>
    <li class="font-bold">password</li>
    <li class="font-bold">number</li>
    <li class="font-bold">tel</li>
    <li class="font-bold">url</li>
    <li class="font-bold">date</li>
    <li class="font-bold">datetime-local</li>
    <li class="font-bold">time</li>
    <li class="font-bold">week</li>
    <li class="font-bold">month</li>
    <li class="font-bold">search</li>
    <li class="font-bold">checkbox</li>
    <li class="font-bold">radio</li>
    <li class="font-bold">select</li>
    <li class="font-bold">textarea</li>
    <li class="font-bold">datepicker</li>
  </ul>
</template>
<script setup>
import Code from '../Components/Code.vue'
import InertiaForm from '@/InertiaForm.vue'
import FormInput from '@/components/FormInput.vue'
const sampleInput = {
  type: "email",
  key: "demo_email",
  default: "",
  label: "Email",
  placeholder: "Placeholder text"
}
</script>
