import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import SliderComponent from '@/components/editor/SliderComponent.vue';
import sliderComponentPropsChecker from './slider-component-props-checker.ts';
import LinkUnderlineOpacityComponent from '@/components/editor/UI/link/LinkUnderlineOpacityComponent.vue';

describe('LinkUnderlineOpacityComponent', () => {
  let component;
  beforeEach(() => {
    component = mount(LinkUnderlineOpacityComponent);
  });

  it('should render correct option heading', () => {
    const optionHeadingComponent = component.findComponent(
      OptionHeadingComponent,
    );
    const headingComponentProps = optionHeadingComponent.props();

    expect(component.findAllComponents(OptionHeadingComponent)).toHaveLength(1);
    expect(headingComponentProps.title).toBe('Link Underline Opacity');
    expect(headingComponentProps.popoverTitle).toBe('Link underline opacity');
    expect(headingComponentProps.popoverText).toBe(
      'Свойство link underline opacity позволяет установить прозрачность для подчеркивающей полоски у ссылки в различных условиях.',
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
