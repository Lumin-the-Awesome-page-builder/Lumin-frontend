import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Editor from '@/components/editor/Editor.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'editor',
    component: Editor,
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/AuthView.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(''),
  routes,
});

export default router;
