import { mount } from '@vue/test-utils';
import { beforeEach, describe, it, expect } from 'vitest';
import CheckboxComponent from '@/components/editor/CheckboxComponent.vue';
import { NCheckbox } from 'naive-ui';

describe('CheckboxComponent', () => {
  let component;
  const subheading = 'SUB';
  const label = 'label';
  const size = 'medium';
  beforeEach(() => {
    component = mount(CheckboxComponent, {
      props: {
        subheading,
        label,
        size,
      },
    });
  });

  it('should render correct subheading', () => {
    expect(component.find('.subheading').text()).toBe(subheading);
  });

  it('should render correct n-checkbox', () => {
    const n_checkbox = component.findComponent(NCheckbox);

    const props = n_checkbox.props();

    expect(props.size).toBe(size);
    expect(props.label).toBe(label);
  });
});
