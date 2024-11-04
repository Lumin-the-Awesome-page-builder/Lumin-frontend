import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import { NButton } from 'naive-ui';
import FlexDirectionComponent from '@/components/editor/UI/FlexDirectionComponent.vue';

describe('FlexDirectionComponent', () => {
  let component;
  beforeEach(() => {
    component = mount(FlexDirectionComponent);
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
    const activeButtonIndex = 1;
    component.vm.$data.activeButton = activeButtonIndex;

    const n_buttons = component.findAllComponents(NButton);

    expect(n_buttons).toHaveLength(2);
  });

  it('should change active btn correctly', () => {
    component.vm.$data.activeButton = 0;

    component.vm.setActiveButton(1);

    expect(component.vm.$data.activeButton).toBe(1);
  });
});
