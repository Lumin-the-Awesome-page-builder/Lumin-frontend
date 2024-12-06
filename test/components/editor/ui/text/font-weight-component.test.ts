import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import SliderComponent from '@/components/editor/SliderComponent.vue';
import sliderComponentPropsChecker from '../link/slider-component-props-checker.ts';
import FontProp from '@/editor/properties/text/FontProp.ts';
import Text from '@/editor/components/Text.ts';
import FontComponent from '@/components/editor/UI/text/FontComponent.vue';

describe('FontWeightComponent', () => {
  let component;
  let mockSetValue;
  beforeEach(() => {
    const prop = new FontProp([null], new Text());
    mockSetValue = vi.fn();
    prop.setValue = mockSetValue;
    component = mount(FontComponent, {
      props: {
        prop,
      },
    });
  });

  it('should render correct option heading', () => {
    const optionHeadingComponent = component.findComponent(
      OptionHeadingComponent,
    );
    const headingComponentProps = optionHeadingComponent.props();

    expect(component.findAllComponents(OptionHeadingComponent)).toHaveLength(2);
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
        sliderComponentPropsChecker(slider, component.vm.slider),
      ),
    );
  });
  it('should update slider correctly', async () => {
    const sliders = component.findAllComponents(SliderComponent);

    sliders.every((slider) => slider.vm.$emit('update', 60));

    expect(mockSetValue).toBeCalled();
  });
});
