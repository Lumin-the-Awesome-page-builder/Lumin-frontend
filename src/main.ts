import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import '@/assets/bootstrap-vars.css';
import Editor from '@/editor/plugin.ts';
import * as Sentry from '@sentry/vue';
import '@/utils/errorHandler.ts'
createApp(App).use(Editor).use(createPinia()).use(router).mount('#app');

Sentry.init({
  App,
  dsn: 'https://96054960bf2e7d36c263ed87e6314b11@o4508316178120704.ingest.de.sentry.io/4508316180283472',
  integrations: [
    Sentry.browserTracingIntegration({ router }),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

createApp(App).use(Editor).use(createPinia()).use(router).mount('#app')
