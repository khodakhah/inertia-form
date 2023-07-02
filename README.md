# inertia-form
This is a vue component to create InertiaJs forms from an object.

## Installation
```bash
npm install @khodakhah/inertia-form
```

## Usage
In `YourComponent.vue` file:
```vue
<template>
  <div>
    <InertiaForm :inputs="inputs"/>
  </div>
</template>

<script setup>
import { InertiaForm } from '@khodakhah/inertia-form.vue'
const inputs = [
  {
    key: 'first_name'
    type: 'text',
    label: 'First Name',
  },
  { 
    key: 'last_name'
    type: 'text',
    label: 'Last Name',
  },
  {
    key: 'email'
    type: 'email',
    label: 'Email',
  },
]
</script>
```

## Development
```bash
# Clone the repository
git clone https://github.com/khodakhah/form-vue.git

# Go to the project directory
cd form-vue

# Set npm version
nvm use

# Install dependencies
npm install

# Run the development server
npm run serve
```
