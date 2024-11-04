import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import CheckboxComponent from '@/components/editor/CheckboxComponent.vue';
import InlineTextComponent from '@/components/editor/UI/text/InlineTextComponent.vue';
import checkboxComponentPropsChecker from './checkbox-component-props-checker.ts';

describe('InlineTextComponent', () => {
  let component;
  beforeEach(() => {
    component = mount(InlineTextComponent);
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
        checkboxComponentPropsChecker(
          checkbox,
          component.vm.$data.checkboxes[index],
        ),
      ),
    );
  });
});
