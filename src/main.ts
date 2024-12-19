import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import '@/assets/bootstrap-vars.css';
import Editor from '@/editor/plugin.ts';
import * as Sentry from '@sentry/vue';

declare global {
  interface Window {
    ym: any;
  }
}

window.ym =
  window.ym ||
  function () {
    // eslint-disable-next-line prefer-rest-params
    (window.ym.a = window.ym.a || []).push(arguments);
  };
window.ym(99252824, 'init', {
  defer: true,
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
});

createApp(App).use(Editor).use(createPinia()).use(router).mount('#app');

Sentry.init({
  App,
  dsn: 'https://96054960bf2e7d36c263ed87e6314b11@o4508316178120704.ingest.de.sentry.io/4508316180283472',
  integrations: [
    Sentry.browserTracingIntegration({ router }),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
