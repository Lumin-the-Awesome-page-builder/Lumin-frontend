import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import CheckboxComponent from '@/components/editor/CheckboxComponent.vue';
import checkboxComponentPropsChecker from './text/checkbox-component-props-checker.ts';
import DisplayFlexComponent from '@/components/editor/UI/DisplayFlexComponent.vue';
import Container from '@/editor/components/Container.ts';
import FlexProp from '@/editor/properties/FlexProp.ts';

describe('DisplayFlexComponent', () => {
  let component;
  beforeEach(() => {
    const prop = new FlexProp([null], new Container('div'));
    component = mount(DisplayFlexComponent, {
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
    expect(headingComponentProps.title).toBe('Display Flex');
    expect(headingComponentProps.popoverTitle).toBe('Display flex');
    expect(headingComponentProps.popoverText).toBe(
      'Включает flex сетку у компонента',
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
});
