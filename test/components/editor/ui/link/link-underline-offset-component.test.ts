import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import SliderComponent from '@/components/editor/SliderComponent.vue';
import LinkUnderlineOffsetComponent from '@/components/editor/UI/link/LinkUnderlineOffsetComponent.vue';
import sliderComponentPropsChecker from './slider-component-props-checker.ts';

describe('LinkUnderlineOffsetComponent', () => {
  let component;
  beforeEach(() => {
    component = mount(LinkUnderlineOffsetComponent);
  });

  it('should render correct option heading', () => {
    const optionHeadingComponent = component.findComponent(
      OptionHeadingComponent,
    );
    const headingComponentProps = optionHeadingComponent.props();

    expect(component.findAllComponents(OptionHeadingComponent)).toHaveLength(1);
    expect(headingComponentProps.title).toBe('Link Underline Offset');
    expect(headingComponentProps.popoverTitle).toBe('Link underline offset');
    expect(headingComponentProps.popoverText).toBe(
      'Расстояние между текстом и подчеркивающей полосой.',
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
