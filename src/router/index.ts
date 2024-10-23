import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Editor from '@/components/editor/Editor.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'editor',
    component: Editor,
  }
];

const router = createRouter({
  history: createWebHistory(''),
  routes,
});

export default router;
