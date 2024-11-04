import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import SliderComponent from '@/components/editor/SliderComponent.vue';
import LinkOpacityComponent from '@/components/editor/UI/link/LinkOpacityComponent.vue';
import sliderComponentPropsChecker from './slider-component-props-checker.ts';

describe('LinkOpacityComponent', () => {
  let component;
  beforeEach(() => {
    component = mount(LinkOpacityComponent);
  });

  it('should render correct option heading', () => {
    const optionHeadingComponent = component.findComponent(
      OptionHeadingComponent,
    );
    const headingComponentProps = optionHeadingComponent.props();

    expect(component.findAllComponents(OptionHeadingComponent)).toHaveLength(1);
    expect(headingComponentProps.title).toBe('Link Opacity');
    expect(headingComponentProps.popoverTitle).toBe('Link opacity');
    expect(headingComponentProps.popoverText).toBe(
      'Свойство link opacity позволяет установить прозрачность ссылки в различных условиях.',
    );
  });

  it('should render slider correctly', () => {
    const sliderComponents = component.findAllComponents(SliderComponent);

    expect(sliderComponents).toHaveLength(2);
    expect(
      sliderComponents.every((slider, index) =>
        sliderComponentPropsChecker(slider, component.vm.$data.values[index]),
      ),
    );
  });
});
