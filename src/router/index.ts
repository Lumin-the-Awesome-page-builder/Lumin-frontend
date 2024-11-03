import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Editor from '@/components/editor/Editor.vue';
import TokenUtil from '@/utils/token.util.ts';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/AuthView.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignupView.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
  },
  {
    path: '/editor',
    name: 'editor',
    component: Editor,
  },
];

const router = createRouter({
  history: createWebHistory(''),
  routes,
});

router.beforeEach((to, from, next) => {
  if (TokenUtil.isAuthorized()) {
    if (to.path === '/auth' || to.path === '/signup') {
      next({ path: '/dashboard' });
      return;
    }
  } else if (!TokenUtil.isAuthorized()) {
    if (to.path !== '/auth' && to.path !== '/signup') {
      next({ path: '/auth' });
      return;
    }
  }
  next();
});

export default router;
