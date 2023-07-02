<template>
  <h2>Form</h2>
  <p>The form component is <code class="code">LaravelFormSync</code></p>
  <p>The form component have the following properties:</p>
  <table class="table-auto mt-3 mb-4">
    <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>submitLabel</td>
      <td>String</td>
      <td>The label of submit button.</td>
    </tr>
    <tr>
      <td>inputs</td>
      <td>Array of "<strong>Input</strong>"</td>
      <td>The list of inputs.</td>
    </tr>
    <tr>
      <td>action</td>
      <td>String</td>
      <td>The action of form.</td>
    </tr>
    <tr>
      <td>method</td>
      <td>String</td>
      <td>The method of form.</td>
    </tr>
    <tr>
      <td>onFinish</td>
      <td>Function</td>
      <td>The callback function after submit.</td>
    </tr>
    <tr>
      <td>staticErrors</td>
      <td>Object</td>
      <td>The list of static errors. The errors that you want to display under each input.</td>
    </tr>
    <tr>
      <td>reset</td>
      <td>Boolean</td>
      <td>Reset the form after submit.</td>
    </tr>
    </tbody>
  </table>
  <h2>Input</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="mb-4">
      <p>An input should be defined as an object.</p>
      <p>There is three interface of input object:</p>
      <ul class="ul">
        <li>Input</li>
        <li>InputSelect</li>
        <li>InputDate</li>
      </ul>
      <p>Each one of them supports one or many HTML form elements.</p>
    </div>
    <div class="mb-4"><Code>{{ inputs[0] }}</Code></div>
  </div>
  <h3>Interface <strong>Input</strong></h3>
  <table class="table-auto mb-4">
    <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
      <th>Supported values</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>type</td>
      <td>String</td>
      <td>The type of input.</td>
      <td>text, email, password, number, tel, url, date, datetime-local, time, week, month, search, checkbox, radio, textarea</td>
    </tr>
    <tr>
      <td>key</td>
      <td>String</td>
      <td>The name of input. This name will be placed as element name and id.</td>
      <td>Any string</td>
    </tr>
    <tr>
      <td>label</td>
      <td>String</td>
      <td>The label of input.</td>
      <td>Any string</td>
    </tr>
    <tr>
      <td>default</td>
      <td>String</td>
      <td>The value of input. The input attribute "value".</td>
      <td>Any string</td>
    </tr>
    <tr>
      <td>placeholder</td>
      <td>String</td>
      <td>The placeholder of input.</td>
      <td>Any string</td>
    </tr>
    <tr>
      <td>required</td>
      <td>Boolean</td>
      <td>Is the input required? * Optional, default: false</td>
      <td>true, false</td>
    </tr>
    </tbody>
  </table>
  <h3>Interface <strong>InputSelect</strong></h3>
  <table class="table-auto mb-4">
    <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
      <th>Supported values</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>type</td>
      <td>String</td>
      <td>The type of input.</td>
      <td>select</td>
    </tr>
    <tr>
      <td>key</td>
      <td>String</td>
      <td>The name of input. This name will be placed as element name and id.</td>
      <td>Any string</td>
    </tr>
    <tr>
      <td>label</td>
      <td>String</td>
      <td>The label of input.</td>
      <td>Any string</td>
    </tr>
    <tr>
      <td>default</td>
      <td>String</td>
      <td>The value of input. The input attribute "value".</td>
      <td>Any string</td>
    </tr>
    <tr>
      <td>placeholder</td>
      <td>String</td>
      <td>The placeholder of input.</td>
      <td>Any string</td>
    </tr>
    <tr>
      <td>required</td>
      <td>Boolean</td>
      <td>Is the input required? * Optional, default: false</td>
      <td>true, false</td>
    </tr>
    <tr>
      <td>SelectOption</td>
      <td>Array of "<strong>SelectOption</strong>"</td>
      <td>The list of options.</td>
      <td>Array of "SelectOption"</td>
    </tr>
    </tbody>
  </table>
  <h3>Interface <strong>InputDate</strong></h3>
  <table class="table-auto mb-4">
    <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
      <th>Supported values</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>type</td>
      <td>String</td>
      <td>The type of input.</td>
      <td>datepicker</td>
    </tr>
    <tr>
      <td>key</td>
      <td>String</td>
      <td>The name of input. This name will be placed as element name and id.</td>
      <td>Any string</td>
    </tr>
    <tr>
      <td>label</td>
      <td>String</td>
      <td>The label of input.</td>
      <td>Any string</td>
    </tr>
    <tr>
      <td>default</td>
      <td>String</td>
      <td>The value of input. The input attribute "value".</td>
      <td>Any string</td>
    </tr>
    <tr>
      <td>placeholder</td>
      <td>String</td>
      <td>The placeholder of input.</td>
      <td>Any string</td>
    </tr>
    <tr>
      <td>required</td>
      <td>Boolean</td>
      <td>Is the input required? * Optional, default: false</td>
      <td>true, false</td>
    </tr>
    <tr>
      <td>min</td>
      <td>string</td>
      <td>The minimum date that is possible. * Optional. * Empty string means <strong>undefined</strong>.</td>
      <td>A valid date</td>
    </tr>
    <tr>
      <td>max</td>
      <td>string</td>
      <td>The maximum date that is possible. * Optional. * Empty string means <strong>undefined</strong>.</td>
      <td>A valid date</td>
    </tr>
    <tr>
      <td>allowed</td>
      <td>Array of string</td>
      <td>The list of allowed dates. * Optional. * Empty array means <strong>undefined</strong>.</td>
      <td>An array of valid dates</td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>Array of string</td>
      <td>The list of disabled dates. * Optional. * Empty array means <strong>undefined</strong>.</td>
      <td>An array of valid dates</td>
    </tr>
    <tr>
      <td>disabledWeekDays</td>
      <td>Array of number</td>
      <td>The list of disabled week days. * Optional. * Empty array means <strong>undefined</strong>.</td>
      <td>An array of numbers from 0 to 6, 0 is Sunday, 6 is Saturday</td>
    </tr>
    </tbody>
  </table>
  <h3>Interface <strong>SelectOption</strong></h3>
  <table class="table-auto mb-4">
    <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
      <th>Supported values</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>value</td>
      <td>String</td>
      <td>The value of option.</td>
      <td>Any string</td>
    </tr>
    <tr>
      <td>label</td>
      <td>String</td>
      <td>The label of option.</td>
      <td>Any string</td>
    </tr>
    </tbody>
  </table>
  <h3>All inputs</h3>
  <h4>Example</h4>
  <p>Bellow you can find all supported elements.</p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="">
      <Code class="overflow-y-auto md:h-[85rem]">{{ inputs }}</Code>
    </div>
    <div class="mb-4 p-4 border rounded-lg">
      <LaravelFormSync :inputs="inputs" :on-submit="fakeSubmit"/>
    </div>
  </div>
</template>
<script setup>
import Code from '../Components/Code.vue'
import inputs from '../examples/inputs.js'
import LaravelFormSync from '@/LaravelFormSync.vue'
const fakeSubmit = (form, defaultData) => {
  let result = ''
  for (const [key, value] of Object.entries(form.data())) {
    result += `${key}: ${value}\n`
  }
  alert(result)
}
</script>
