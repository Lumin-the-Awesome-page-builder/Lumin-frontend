import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import CheckboxComponent from '@/components/editor/CheckboxComponent.vue';
import checkboxComponentPropsChecker from './checkbox-component-props-checker.ts';
import ListUnstyledComponent from '@/components/editor/UI/text/ListUnstyledComponent.vue';

describe('ListUnstyledComponent', () => {
  let component;
  beforeEach(() => {
    component = mount(ListUnstyledComponent);
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
