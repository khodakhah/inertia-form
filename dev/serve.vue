<template>
    <div class="container">
      <div class="border border-gray-400 p-5 m-2">
        <h2 class="h2">General form</h2>
        <FormVue :inputs="inputs" submitLabel="Send" />
      </div>
    </div>
</template>

<script setup>
    import FormVue from '../src/FormVue.vue';

    const inputs = [
      {
        type: "text",
        key: "demo_text",
        default: "",
        label: "Name",
        placeholder: "Enter your full name",
      },
      {
        type: "email",
        key: "demo_email",
        default: "",
        label: "Email",
        placeholder: "Enter your email address",
      },
      {
        type: "tel",
        key: "demo_tel",
        default: "",
        label: "Phone",
        placeholder: "Enter your phone number",
      },
    ];
</script>
