import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
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
    path: '/project/:id/edit',
    name: 'editor',
    component: () => import('@/views/EditorView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(''),
  routes,
});

router.beforeEach((to, from, next) => {
  if (TokenUtil.isAuthorized()) {
    if (to.path === '/' || to.path === '/auth' || to.path === '/signup') {
      next({ path: '/dashboard' });
      return;
    }
  } else if (!TokenUtil.isAuthorized()) {
    if (to.path === '/' || (to.path !== '/auth' && to.path !== '/signup')) {
      next({ path: '/auth' });
      return;
    }
  }
  next();
});

export default router;
