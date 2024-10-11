import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../components/HelloWorld.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/VueComponent.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(''),
  routes,
});

export default router;
