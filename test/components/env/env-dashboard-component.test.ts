import { mount } from '@vue/test-utils';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import EnvDashboardComponent from '@/components/env/EnvDashboardComponent.vue';

vi.mock('naive-ui', () => {
  return {
    useNotification: vi.fn(() => 'notificationStore'),
  };
});

describe('env-dashboard-component-test', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('render correctly', () => {
    const wrapper = mount(EnvDashboardComponent, {});

    expect(wrapper.findComponent(EnvDashboardComponent).exists()).toBe(true);
  });
});
