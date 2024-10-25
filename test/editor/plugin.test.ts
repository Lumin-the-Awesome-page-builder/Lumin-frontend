import { beforeEach, describe, it, assert } from 'vitest';
import { App as AppVue, createApp } from 'vue';

import plugin from '@/editor/plugin.ts';

describe('Test plugin', () => {
  let app: AppVue;
  beforeEach(() => {
    app = createApp();
    app.use(plugin);
  });

  it('test Editor', () => {
    const curApp = app.mount(document.createElement('div'));
    assert.isNotNull(curApp.$mount_editor);
  });
});
