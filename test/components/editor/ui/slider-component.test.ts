import { mount } from '@vue/test-utils';
import { beforeEach, describe, it, expect } from 'vitest';
import { NSlider } from 'naive-ui';
import SliderComponent from '@/components/editor/SliderComponent.vue';

describe('SliderComponent', () => {
  let component;
  const marks = {};
  const initialValue = 1;
  const showMarks = false;
  const subheading = 'SUB';
  beforeEach(() => {
    component = mount(SliderComponent, {
      props: {
        subheading,
        marks,
        initialValue,
        showMarks,
      },
    });
  });

  it('should render correct subheading', () => {
    expect(component.find('.subheading').text()).toBe(subheading);
  });

  it('should render correct n-slider', () => {
    const n_slider = component.findComponent(NSlider);

    const props = n_slider.props();

    expect(props.marks).toEqual(marks);
  });
});
