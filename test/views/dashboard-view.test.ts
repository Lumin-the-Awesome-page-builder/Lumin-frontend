import { shallowMount } from '@vue/test-utils';
import DashboardView from '@/views/DashboardView.vue';
import ProjectPreviewModal from '@/components/ProjectPreviewModal.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import DashboardComponent from '@/components/DashboardComponent.vue';
import { describe, it, expect, vi } from 'vitest';

vi.mock("codemirror-editor-vue3", async () => {
  return {
    default: (await import('@/components/editor/UI/CodeMirrorMock.vue'))
  }
})

describe('DashboardView', () => {
  it('renders all child components', () => {
    const wrapper = shallowMount(DashboardView);

    expect(wrapper.findComponent(ProjectPreviewModal).exists()).toBe(true);
    expect(wrapper.findComponent(HeaderComponent).exists()).toBe(true);
    expect(wrapper.findComponent(DashboardComponent).exists()).toBe(true);
  });

  it('displays the correct text in the footer', () => {
    const wrapper = shallowMount(DashboardView);
    const footerText = wrapper.find('.footerText');

    expect(footerText.exists()).toBe(true);
    expect(footerText.text()).toBe('LuminTech 2024');
  });
});
