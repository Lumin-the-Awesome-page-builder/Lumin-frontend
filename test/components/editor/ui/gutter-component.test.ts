import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import SliderComponent from '@/components/editor/SliderComponent.vue';
import sliderComponentPropsChecker from './link/slider-component-props-checker.ts';
import GutterComponent from '@/components/editor/UI/GutterComponent.vue';

describe('GutterComponent', () => {
  let component;
  beforeEach(() => {
    component = mount(GutterComponent);
  });

  it('should render correct option heading', () => {
    const optionHeadingComponent = component.findComponent(
      OptionHeadingComponent,
    );
    const headingComponentProps = optionHeadingComponent.props();

    expect(component.findAllComponents(OptionHeadingComponent)).toHaveLength(1);
    expect(headingComponentProps.title).toBe('Gap');
    expect(headingComponentProps.popoverTitle).toBe('Gap');
    expect(headingComponentProps.popoverText).toBe(
      'Gap — это пространство между колонками, которое помогает управлять размещением и выравниванием контента в системе сеток',
    );
  });

  it('should render slider correctly', () => {
    const sliderComponents = component.findAllComponents(SliderComponent);

    expect(sliderComponents).toHaveLength(1);
    expect(
      sliderComponents.every((slider, index) =>
        sliderComponentPropsChecker(slider, component.vm.$data.values[index]),
      ),
    );
  });
});
