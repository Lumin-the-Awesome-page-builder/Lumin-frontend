import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import SliderComponent from '@/components/editor/SliderComponent.vue';
import sliderComponentPropsChecker from './link/slider-component-props-checker.ts';
import ColWidthComponent from '@/components/editor/UI/ColWidthComponent.vue';
import Container from '@/editor/components/Container.ts';
import ColWidthProp from '@/editor/properties/ColWidthProp.ts';

describe('ColWidthComponent', () => {
  let component;
  let mockSetValue;
  beforeEach(() => {
    const prop = new ColWidthProp([null], new Container('div'));
    mockSetValue = vi.fn();
    prop.setValue = mockSetValue;
    component = mount(ColWidthComponent, {
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
    expect(headingComponentProps.title).toBe('Column Width');
    expect(headingComponentProps.popoverTitle).toBe('Column width');
    expect(headingComponentProps.popoverText).toBe(
      'В Bootstrap система колонок основана на 12-колоночной сетке, что означает, что ширина контейнера делится на 12 равных частей. При использовании классов, таких как col-8 и col-12, вы определяете, сколько из этих 12 частей будет занимать конкретный элемент',
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
