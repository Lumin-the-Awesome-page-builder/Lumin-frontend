import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import SliderComponent from '@/components/editor/SliderComponent.vue';
import LinkOpacityComponent from '@/components/editor/UI/link/LinkOpacityComponent.vue';
import sliderComponentPropsChecker from './slider-component-props-checker.ts';
import Link from '@/editor/components/Link.ts';
import LinkOpacityProp from '@/editor/properties/link/LinkOpacityProp.ts';

describe('LinkOpacityComponent', () => {
  let component;
  let mockSetValue;
  beforeEach(() => {
    mockSetValue = vi.fn();
    const prop = new LinkOpacityProp([null], new Link());
    prop.setValue = mockSetValue;
    component = mount(LinkOpacityComponent, {
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
