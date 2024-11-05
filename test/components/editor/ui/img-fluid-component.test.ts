import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import CheckboxComponent from '@/components/editor/CheckboxComponent.vue';
import checkboxComponentPropsChecker from './text/checkbox-component-props-checker.ts';
import ImgFluidComponent from '@/components/editor/UI/ImgFluidComponent.vue';

describe('ImgFluidComponent', () => {
  let component;
  beforeEach(() => {
    component = mount(ImgFluidComponent);
  });

  it('should render correct option heading', () => {
    const optionHeadingComponent = component.findComponent(
      OptionHeadingComponent,
    );
    const headingComponentProps = optionHeadingComponent.props();

    expect(component.findAllComponents(OptionHeadingComponent)).toHaveLength(1);
    expect(headingComponentProps.title).toBe('Fluid Image');
    expect(headingComponentProps.popoverTitle).toBe('Fluid image');
    expect(headingComponentProps.popoverText).toBe(
      'Позволяет изображению автоматически менять свой размер в зависимости от размера его родительского элемента.',
    );
  });

  it('should render checkboxes correctly', () => {
    const sliderComponents = component.findAllComponents(CheckboxComponent);

    expect(sliderComponents).toHaveLength(1);
    expect(
      sliderComponents.every((checkbox, index) =>
        checkboxComponentPropsChecker(
          checkbox,
          component.vm.$data.checkboxes[index],
        ),
      ),
    );
  });
});
