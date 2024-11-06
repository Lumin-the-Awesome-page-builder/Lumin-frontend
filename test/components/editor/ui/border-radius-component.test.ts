import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import SliderComponent from '@/components/editor/SliderComponent.vue';
import sliderComponentPropsChecker from './link/slider-component-props-checker.ts';
import BorderRadiusComponent from '@/components/editor/UI/BorderRadiusComponent.vue';
import Container from '@/editor/components/Container.ts';
import BorderRadiusProp from '@/editor/properties/BorderRadiusProp.ts';

describe('BorderRadiusComponent', () => {
  let component;
  let mockSetValue;
  beforeEach(() => {
    const prop = new BorderRadiusProp([null], new Container('div'));
    mockSetValue = vi.fn();
    prop.setValue = mockSetValue;
    component = mount(BorderRadiusComponent, {
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
    expect(headingComponentProps.title).toBe('Border Radius');
    expect(headingComponentProps.popoverTitle).toBe('Border radius');
    expect(headingComponentProps.popoverText).toBe(
      'Радиус скругления углов у объекта',
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
