import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import { NButton } from 'naive-ui';
import TextAlignComponent from '@/components/editor/UI/text/TextAlignComponent.vue';
import Text from '@/editor/components/Text.ts';
import TextAlignProp from '@/editor/properties/text/TextAlignProp.ts';

describe('TextAlignComponent', () => {
  let component;
  let mockSetValue;
  beforeEach(() => {
    const prop = new TextAlignProp(['start'], new Text());
    mockSetValue = vi.fn();
    prop.setValue = mockSetValue;
    component = mount(TextAlignComponent, {
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
    expect(headingComponentProps.title).toBe('Text Align');
    expect(headingComponentProps.popoverTitle).toBe('Text align');
    expect(headingComponentProps.popoverText).toBe('Выравнивание текста');
  });

  it('should render buttons correctly', () => {
    component.vm.activeButton = 0;

    console.log(component.vm.buttons);

    const n_buttons = component.findAllComponents(NButton);

    expect(n_buttons).toHaveLength(3);
  });
  it('should change active btn correctly', () => {
    component.vm.activeButton = 1;

    const button = {
      value: 123,
    };

    component.vm.setActiveButton(0, button);

    expect(mockSetValue).toHaveBeenCalledWith(123);
    expect(component.vm.activeButton).toBe(0);
  });
});
