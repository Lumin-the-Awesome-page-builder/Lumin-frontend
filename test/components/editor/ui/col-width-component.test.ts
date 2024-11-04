import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import SliderComponent from '@/components/editor/SliderComponent.vue';
import sliderComponentPropsChecker from './link/slider-component-props-checker.ts';
import ColWidthComponent from '@/components/editor/UI/ColWidthComponent.vue';

describe('ColWidthComponent', () => {
  let component;
  beforeEach(() => {
    component = mount(ColWidthComponent);
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
        sliderComponentPropsChecker(slider, component.vm.$data.values[index]),
      ),
    );
  });
});
