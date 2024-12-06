import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import CheckboxComponent from '@/components/editor/CheckboxComponent.vue';
import checkboxComponentPropsChecker from './checkbox-component-props-checker.ts';
import LeadParagraphComponent from '@/components/editor/UI/text/LeadParagraphComponent.vue';
import Text from '@/editor/components/Text.ts';
import LeadParagraphProp from '@/editor/properties/text/LeadParagraphProp.ts';

describe('LeadParagraphComponent', () => {
  let component;
  let mockSetValue;
  beforeEach(() => {
    const prop = new LeadParagraphProp([null], new Text());
    mockSetValue = vi.fn();
    prop.setValue = mockSetValue;
    component = mount(LeadParagraphComponent, {
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
    expect(headingComponentProps.title).toBe('Lead Paragraph');
    expect(headingComponentProps.popoverTitle).toBe('Выделение абзаца');
    expect(headingComponentProps.popoverText).toBe(
      'Чтобы сделать абзац выделенным, включите опцию',
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
