<template>
  <div class="text-5xl mb-4">Laravel-Form-Sync</div>
  <h1 class="text-3xl mb-3">Introduction</h1>
  <p>This is a <strong>vue3</strong> base package to convert a json object to an <strong>InertiaJS</strong> form.</p>
  <p>This package can be used only as vue component.</p>
  <p class="mb-3">The package have been build with, <strong>vue3</strong> and <strong>tailwind</strong>.</p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div>
      <h2 class="text-2xl mb-2">Example Code</h2>
      <code class="text-sm text-gray-600 dark:text-gray-500 p-2">MyComponent.vue</code>
      <Code class="overflow-y-auto md:h-96">{{ example }}</Code>
    </div>
    <div>
      <div class="p-4 max-md:border-t-2 md:border-l-2 border-gray-200 border-dashed dark:border-gray-700">
        <h2 class="text-2xl mb-2">Result</h2>
        <LaravelFormSync :inputs="inputs" submitLabel="Send"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import LaravelFormSync from '@/LaravelFormSync.vue'
import Code from '../Components/Code.vue'

const inputs = [
  {
    type: 'text',
    key: 'demo_text',
    default: '',
    label: 'Name',
    placeholder: 'Enter your full name',
  },
  {
    type: 'email',
    key: 'demo_email',
    default: '',
    label: 'Email',
    placeholder: 'Enter your email address',
  },
  {
    type: 'tel',
    key: 'demo_tel',
    default: '',
    label: 'Phone',
    placeholder: 'Enter your phone number',
  },
]

const example = '<template>\n' +
    '    <LaravelFormSync :inputs="inputs" submitLabel="Send" />\n' +
    '<\/template>\n' +
    '<script setup>\n' +
    'import LaravelFormSync from "@/LaravelFormSync.vue";\n' +
    'const inputs = [\n' +
    '    {\n' +
    '        type: "text",\n' +
    '        key: "demo_text",\n' +
    '        default: "",\n' +
    '        label: "Name",\n' +
    '        placeholder: "Enter your full name",\n' +
    '    },\n' +
    '    {\n' +
    '        type: "email",\n' +
    '        key: "demo_email",\n' +
    '        default: "",\n' +
    '        label: "Email",\n' +
    '        placeholder: "Enter your email address",\n' +
    '    },\n' +
    '    {\n' +
    '        type: "tel",\n' +
    '        key: "demo_tel",\n' +
    '        default: "",\n' +
    '        label: "Phone",\n' +
    '        placeholder: "Enter your phone number",\n' +
    '    },\n' +
    '];\n' +
    '<\/script>\n'
</script>
