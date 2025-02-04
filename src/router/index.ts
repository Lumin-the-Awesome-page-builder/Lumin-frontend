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
  {
    path: '/envs',
    name: 'EnvList',
    component: () => import('@/views/EnvListView.vue'),
  },
  {
    path: '/envs/:envId',
    name: 'Env',
    component: () => import('@/views/EnvView.vue'),
  },
  {
    path: '/envs/create',
    name: 'CreateEnv',
    component: () => import('@/views/CreateEnvView.vue'),
  },
  {
    path: '/project/:id/forms',
    name: 'ProjectForms',
    component: () => import('@/views/FormView.vue'),
  },
  {
    path: '/project/:id/forms/:formId',
    name: 'ProjectFormsData',
    component: () => import('@/views/FormViewData.vue'),
  },
  {
    path: '/envs/:envId/container/:containerId',
    name: 'ContainerView',
    component: () => import('@/views/ContainerView.vue'),
  },
  {
    path: '/worker',
    name: 'WorkerView',
    component: () => import('@/views/WorkerView.vue'),
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

  if (window.ym) {
    window.ym(99252824, 'hit', to.path);
  }

  next();
});

export default router;
