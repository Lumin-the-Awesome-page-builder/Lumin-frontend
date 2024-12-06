import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import SliderComponent from '@/components/editor/SliderComponent.vue';
import sliderComponentPropsChecker from './link/slider-component-props-checker.ts';
import GutterComponent from '@/components/editor/UI/GutterComponent.vue';
import Container from '@/editor/components/Container.ts';
import GutterProp from '@/editor/properties/GutterProp.ts';

describe('GutterComponent', () => {
  let component;
  let mockSetValue;
  beforeEach(() => {
    const prop = new GutterProp([null], new Container('div'));
    mockSetValue = vi.fn();
    prop.setValue = mockSetValue;
    component = mount(GutterComponent, {
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
        sliderComponentPropsChecker(slider, component.vm.values[index]),
      ),
    );
  });
  it('should update slider correctly', async () => {
    const sliders = component.findAllComponents(SliderComponent);

    sliders.every((slider) => slider.vm.$emit('update', 60));

    expect(mockSetValue).toBeCalled();
  });
});
