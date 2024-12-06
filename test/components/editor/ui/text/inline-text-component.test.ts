import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import CheckboxComponent from '@/components/editor/CheckboxComponent.vue';
import InlineTextComponent from '@/components/editor/UI/text/InlineTextComponent.vue';
import checkboxComponentPropsChecker from './checkbox-component-props-checker.ts';
import Text from '@/editor/components/Text.ts';
import InlineTextProp from '@/editor/properties/text/InlineTextProp.ts';

describe('InlineTextComponent', () => {
  let component;
  let mockSetValue;
  beforeEach(() => {
    const prop = new InlineTextProp([null], new Text());
    mockSetValue = vi.fn();
    prop.setValue = mockSetValue;
    component = mount(InlineTextComponent, {
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
    expect(headingComponentProps.title).toBe('Inline Text');
    expect(headingComponentProps.popoverTitle).toBe(
      'Внутренне оформление текста',
    );
    expect(headingComponentProps.popoverText).toBe(
      'Включить выделение, или уменьшение текста',
    );
  });

  it('should render checkboxes correctly', () => {
    const sliderComponents = component.findAllComponents(CheckboxComponent);

    expect(sliderComponents).toHaveLength(2);
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
