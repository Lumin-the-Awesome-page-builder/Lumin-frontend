import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import SliderComponent from '@/components/editor/SliderComponent.vue';
import FontWeightComponent from '@/components/editor/UI/text/FontWeightComponent.vue';
import sliderComponentPropsChecker from '../link/slider-component-props-checker.ts';

describe('FontWeightComponent', () => {
  let component;
  beforeEach(() => {
    component = mount(FontWeightComponent);
  });

  it('should render correct option heading', () => {
    const optionHeadingComponent = component.findComponent(
      OptionHeadingComponent,
    );
    const headingComponentProps = optionHeadingComponent.props();

    expect(component.findAllComponents(OptionHeadingComponent)).toHaveLength(1);
    expect(headingComponentProps.title).toBe('Font Weight');
    expect(headingComponentProps.popoverTitle).toBe('Font weight');
    expect(headingComponentProps.popoverText).toBe(
      'Font Weight позволяет указать, насколько жирным будет выглядеть текст.',
    );
  });

  it('should render slider correctly', () => {
    const sliderComponents = component.findAllComponents(SliderComponent);

    expect(sliderComponents).toHaveLength(1);
    expect(
      sliderComponents.every((slider) =>
        sliderComponentPropsChecker(slider, component.vm.$data.slider),
      ),
    );
  });
});
