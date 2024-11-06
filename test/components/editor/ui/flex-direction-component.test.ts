import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import { NButton } from 'naive-ui';
import FlexDirectionComponent from '@/components/editor/UI/FlexDirectionComponent.vue';
import Container from '@/editor/components/Container.ts';
import FlexDirectionProp from '@/editor/properties/FlexDirectionProp.ts';

describe('FlexDirectionComponent', () => {
  let component;
  beforeEach(() => {
    const prop = new FlexDirectionProp([null], new Container('div'));
    component = mount(FlexDirectionComponent, {
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
    expect(headingComponentProps.title).toBe('Flex Direction');
    expect(headingComponentProps.popoverTitle).toBe('Flex direction');
    expect(headingComponentProps.popoverText).toBe(
      'Свойство flex-direction в CSS определяет направление элементов в контейнере — горизонтальное или вертикальное.',
    );
  });

  it('should render buttons correctly', () => {
    component.vm.activeButton = 1;

    const n_buttons = component.findAllComponents(NButton);

    expect(n_buttons).toHaveLength(2);
  });

  it('should change active btn correctly', () => {
    component.vm.activeButton = 0;

    component.vm.setActiveButton(1, 1);

    expect(component.vm.activeButton).toBe(1);
  });
});
