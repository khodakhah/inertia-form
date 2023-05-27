<template>

  <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
    <span class="sr-only">Open sidebar</span>
    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
    </svg>
  </button>

  <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar" data-tabs-toggle="#page" role="tablist">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li class="flex">
          <button type="button" @click="activePage('introduction')" :class="isActive('introduction')" class="grow text-left flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg aria-hidden="true" class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
            <span class="ml-3">Introduction</span>
          </button>
        </li>
        <li class="flex">
          <button type="button" @click="activePage('installation')" :class="isActive('installation')" class="grow text-left flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Installation</span>
          </button>
        </li>
        <li class="flex">
          <button type="button" @click="activePage('guide')" :class="isActive('guide')" class="grow text-left flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd"></path></svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Guide</span>
          </button>
        </li>
        <li class="flex">
          <button type="button" @click="activePage('reference')" :class="isActive('reference')" class="grow text-left flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Reference</span>
          </button>
        </li>
      </ul>
    </div>
  </aside>

  <div class="p-4 sm:ml-64">
    <div id="page" class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      <div v-if="page === 'introduction'">
        This is the introduction!
      </div>
      <div v-if="page === 'installation'">
        This is the installation!
      </div>
      <div v-if="page === 'guide'">
        This is the guide!
      </div>
      <div v-if="page === 'reference'">
        <div class="grid md:grid-cols-2 gap-4 mb-4">
          <div class="flex items-center justify-center">
            <div class="border rounded border-gray-400 p-5 m-2">
              <h2 class="h2">General form</h2>
              <FormVue :inputs="inputs" submitLabel="Send" />
            </div>
          </div>
          <div class="flex items-center justify-center rounded bg-gray- dark:bg-gray-800">
          </div>
          <div class="flex items-center justify-center rounded bg-gray- dark:bg-gray-800">
          </div>
          <div class="flex items-center justify-center rounded bg-gray- dark:bg-gray-800">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
    import FormVue from '../src/FormVue.vue';
    import { initFlowbite } from 'flowbite'
    import {ref} from "vue";

    initFlowbite()

    const page = ref('introduction')

    const activePage = (pageName) => {
      page.value = pageName
    }

    const isActive = (pageName) => {
      if (page.value === pageName) {
        return 'bg-gray-200 dark:bg-gray-700'
      }

      return ''
    }

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
