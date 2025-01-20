import { mount } from '@vue/test-utils';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import CreatePureEnv from '@/components/env/CreatePureEnv.vue';

vi.mock('codemirror-editor-vue3', async () => {
  return {
    default: await import('@/components/editor/UI/CodeMirrorMock.vue'),
  };
});

describe('create-pure-configuration-test', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('render correctly', () => {
    const wrapper = mount(CreatePureEnv, {});

    expect(wrapper.findComponent(CreatePureEnv).exists()).toBe(true);
  });
});
