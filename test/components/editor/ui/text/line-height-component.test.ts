import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import SliderComponent from '@/components/editor/SliderComponent.vue';
import sliderComponentPropsChecker from '../link/slider-component-props-checker.ts';
import LineHeightComponent from '@/components/editor/UI/text/LineHeightComponent.vue';

describe('LineHeightComponent', () => {
  let component;
  beforeEach(() => {
    component = mount(LineHeightComponent);
  });

  it('should render correct option heading', () => {
    const optionHeadingComponent = component.findComponent(
      OptionHeadingComponent,
    );
    const headingComponentProps = optionHeadingComponent.props();

    expect(component.findAllComponents(OptionHeadingComponent)).toHaveLength(1);
    expect(headingComponentProps.title).toBe('Line Height');
    expect(headingComponentProps.popoverTitle).toBe('Line height');
    expect(headingComponentProps.popoverText).toBe('Межстрочный интервал');
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
