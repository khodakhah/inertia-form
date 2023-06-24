import { createApp } from 'vue';
import '/src/style.css'
import Dev from './serve.vue';

const app = createApp(Dev);
app.mount('#app');
