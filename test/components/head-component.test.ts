import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import HeaderComponent from '@/components/HeadComponent.vue';

describe('HeadComponent', () => {
  it('отрисовывается с пользовательским логотипом', () => {
    const customLogoSrc = 'path/to/custom/logo.svg';
    const wrapper = mount(HeaderComponent, {
      props: { logoSrc: customLogoSrc },
    });

    const logoImage = wrapper.find('.logo-image');
    expect(logoImage.attributes('src')).toBe(customLogoSrc);
  });

  it('проверяет наличие вкладок и их иконок', () => {
    const wrapper = mount(HeaderComponent);

    const tabs = wrapper.vm.tabs;
    const navItems = wrapper.findAll('.nav-item');

    expect(navItems).toHaveLength(tabs.length);

    tabs.forEach((tab, index) => {
      const navItem = navItems[index];
      expect(navItem.text()).toContain(tab.name);
      const icon = navItem.find('.tab-icon');
      expect(icon.attributes('src')).toBe(tab.icon);
    });
  });

  it('активирует правильную вкладку при клике', async () => {
    const wrapper = mount(HeaderComponent);

    expect(wrapper.vm.activeTab).toBe(0);
    expect(wrapper.findAll('.nav-item')[0].classes()).toContain('active');

    await wrapper.findAll('.nav-item')[1].trigger('click');

    expect(wrapper.vm.activeTab).toBe(1);
    expect(wrapper.findAll('.nav-item')[1].classes()).toContain('active');
    expect(wrapper.findAll('.nav-item')[0].classes()).not.toContain('active');
  });

  it('отрисовывает вертикальные линии между вкладками', () => {
    const wrapper = mount(HeaderComponent);
    const navItems = wrapper.findAll('.nav-item');

    expect(navItems[0].find('.tab-line').exists()).toBe(false);
    expect(navItems[1].find('.tab-line').exists()).toBe(true);
    expect(navItems[2].find('.tab-line').exists()).toBe(false);
  });
});
