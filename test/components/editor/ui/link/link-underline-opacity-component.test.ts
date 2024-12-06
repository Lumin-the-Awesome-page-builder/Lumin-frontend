import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import SliderComponent from '@/components/editor/SliderComponent.vue';
import sliderComponentPropsChecker from './slider-component-props-checker.ts';
import LinkUnderlineOpacityComponent from '@/components/editor/UI/link/LinkUnderlineOpacityComponent.vue';
import Link from '@/editor/components/Link.ts';
import LinkUnderlineOpacityProp from '@/editor/properties/link/LinkUnderlineOpacityProp.ts';

describe('LinkUnderlineOpacityComponent', () => {
  let component;
  let mockSetValue;
  beforeEach(() => {
    mockSetValue = vi.fn();
    const prop = new LinkUnderlineOpacityProp([null], new Link());
    prop.setValue = mockSetValue;
    component = mount(LinkUnderlineOpacityComponent, {
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
    expect(headingComponentProps.title).toBe('Link Underline Opacity');
    expect(headingComponentProps.popoverTitle).toBe('Link underline opacity');
    expect(headingComponentProps.popoverText).toBe(
      'Свойство link underline opacity позволяет установить прозрачность для подчеркивающей полоски у ссылки в различных условиях.',
    );
  });

  it('should render slider correctly', () => {
    const sliderComponents = component.findAllComponents(SliderComponent);

    expect(sliderComponents).toHaveLength(2);
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
