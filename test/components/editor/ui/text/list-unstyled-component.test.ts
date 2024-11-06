import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import CheckboxComponent from '@/components/editor/CheckboxComponent.vue';
import checkboxComponentPropsChecker from './checkbox-component-props-checker.ts';
import ListUnstyledComponent from '@/components/editor/UI/text/ListUnstyledComponent.vue';
import Text from '@/editor/components/Text.ts';
import ListUnstyledProp from '@/editor/properties/text/ListUnstyledProp.ts';

describe('ListUnstyledComponent', () => {
  let component;
  let mockSetValue;
  beforeEach(() => {
    const prop = new ListUnstyledProp([null], new Text());
    mockSetValue = vi.fn();
    prop.setValue = mockSetValue;
    component = mount(ListUnstyledComponent, {
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
    expect(headingComponentProps.title).toBe('List Unstyled');
    expect(headingComponentProps.popoverTitle).toBe(
      'Отключить все декорации списка',
    );
    expect(headingComponentProps.popoverText).toBe(
      'Выключает отсупы слева, а также точки списка',
    );
  });

  it('should render checkboxes correctly', () => {
    const checkboxes = component.findAllComponents(CheckboxComponent);

    expect(checkboxes).toHaveLength(1);
    expect(
      checkboxes.every((checkbox, index) =>
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
