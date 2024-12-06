import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import CheckboxComponent from '@/components/editor/CheckboxComponent.vue';
import checkboxComponentPropsChecker from './checkbox-component-props-checker.ts';
import ListInlineComponent from '@/components/editor/UI/text/ListInlineComponent.vue';
import Text from '@/editor/components/Text.ts';
import ListInlineProp from '@/editor/properties/text/ListInlineProp.ts';

describe('ListInlineComponent', () => {
  let component;
  let mockSetValue;
  beforeEach(() => {
    const prop = new ListInlineProp([null], new Text());
    mockSetValue = vi.fn();
    prop.setValue = mockSetValue;
    component = mount(ListInlineComponent, {
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
    expect(headingComponentProps.title).toBe('List Inline');
    expect(headingComponentProps.popoverTitle).toBe('Список в линию');
    expect(headingComponentProps.popoverText).toBe(
      'Включает отображение списков без точек и с небольшими отступами, в линию',
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
