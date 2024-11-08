import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import '@/assets/bootstrap-vars.css';
import Editor from '@/editor/plugin.ts';

createApp(App).use(Editor).use(createPinia()).use(router).mount('#app');
