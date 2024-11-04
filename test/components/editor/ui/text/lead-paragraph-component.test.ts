import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import CheckboxComponent from '@/components/editor/CheckboxComponent.vue';
import checkboxComponentPropsChecker from './checkbox-component-props-checker.ts';
import LeadParagraphComponent from '@/components/editor/UI/text/LeadParagraphComponent.vue';

describe('LeadParagraphComponent', () => {
  let component;
  beforeEach(() => {
    component = mount(LeadParagraphComponent);
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
        checkboxComponentPropsChecker(
          checkbox,
          component.vm.$data.checkboxes[index],
        ),
      ),
    );
  });
});
