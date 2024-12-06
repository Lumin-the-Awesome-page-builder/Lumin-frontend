import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import CheckboxComponent from '@/components/editor/CheckboxComponent.vue';
import checkboxComponentPropsChecker from './text/checkbox-component-props-checker.ts';
import ImgFluidComponent from '@/components/editor/UI/ImgFluidComponent.vue';
import Image from '@/editor/components/Image.ts';
import ImgFluidProp from '@/editor/properties/ImgFluidProp.ts';

describe('ImgFluidComponent', () => {
  let component;
  let mockSetValue;
  beforeEach(() => {
    const prop = new ImgFluidProp([null], new Image('img'));
    mockSetValue = vi.fn();
    prop.setValue = mockSetValue;
    component = mount(ImgFluidComponent, {
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
        checkboxComponentPropsChecker(checkbox, component.vm.checkboxes[index]),
      ),
    );
  });
  it('should update checkbox correctly (data = true)', async () => {
    const checkboxes = component.findAllComponents(CheckboxComponent);

    checkboxes.every((checkbox) => checkbox.vm.$emit('update', true));
    expect(mockSetValue).toHaveBeenCalledWith('checked', 0);
  });
  it('should update checkbox correctly (data = false)', async () => {
    const checkboxes = component.findAllComponents(CheckboxComponent);

    checkboxes.every((checkbox) => checkbox.vm.$emit('update', false));
    expect(mockSetValue).toHaveBeenCalledWith(null, 0);
  });
});
