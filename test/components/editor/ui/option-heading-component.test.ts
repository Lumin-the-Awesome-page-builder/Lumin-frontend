import { mount } from '@vue/test-utils';
import { beforeEach, describe, it, expect } from 'vitest';
import { NPopover } from 'naive-ui';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';

describe('OptionHeadingComponent', () => {
  let component;
  const title = 'title';
  const popoverTitle = 'popoverTitle';
  const popoverText = 'popoverText';
  beforeEach(() => {
    component = mount(OptionHeadingComponent, {
      props: {
        title,
        popoverTitle,
        popoverText,
      },
    });
  });

  it('should render correct heading', () => {
    expect(component.find('.options-heading').text()).toBe(title);
  });

  it('should render popover', () => {
    expect(component.findComponent(NPopover).exists());
  });
});
