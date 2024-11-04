import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import CheckboxComponent from '@/components/editor/CheckboxComponent.vue';
import checkboxComponentPropsChecker from './checkbox-component-props-checker.ts';
import ListInlineComponent from '@/components/editor/UI/text/ListInlineComponent.vue';

describe('ListInlineComponent', () => {
  let component;
  beforeEach(() => {
    component = mount(ListInlineComponent);
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
