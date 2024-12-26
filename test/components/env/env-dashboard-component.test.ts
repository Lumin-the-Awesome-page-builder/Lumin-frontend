import { describe, it, expect, vi, beforeEach } from 'vitest';
import { shallowMount, mount } from '@vue/test-utils';
import EnvDashboardComponent from '@/components/env/EnvDashboardComponent.vue';

describe('EnvDashboardComponent.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(EnvDashboardComponent, {
      global: {
        stubs: {
          HeaderComponent: true,
        },
      },
    });
  });

  it('renders footer text correctly', () => {
    const footerText = wrapper.find('.footerText');
    expect(footerText.exists()).toBe(true);
    expect(footerText.text()).toBe('LuminTech 2024');
  });

  it('renders the correct structure for the dashboard', () => {
    const dashboard = wrapper.find('.dashboard');
    expect(dashboard.exists()).toBe(true);
    expect(dashboard.classes()).toContain('dashboard');
  });
});
