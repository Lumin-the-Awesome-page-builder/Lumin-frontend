import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import { NButton } from 'naive-ui';
import TextTransformComponent from '@/components/editor/UI/text/TextTransformComponent.vue';

describe('TextTransformComponent', () => {
  let component;
  beforeEach(() => {
    component = mount(TextTransformComponent);
  });

  it('should render correct option heading', () => {
    const optionHeadingComponent = component.findComponent(
      OptionHeadingComponent,
    );
    const headingComponentProps = optionHeadingComponent.props();

    expect(component.findAllComponents(OptionHeadingComponent)).toHaveLength(1);
    expect(headingComponentProps.title).toBe('Text Transform');
    expect(headingComponentProps.popoverTitle).toBe('Text transform');
    expect(headingComponentProps.popoverText).toBe('Трансформация шрифта');
  });

  it('should render buttons correctly', () => {
    const activeButtonIndex = 0;
    component.vm.$data.activeButton = activeButtonIndex;

    console.log(component.vm.$data.buttons);

    const n_buttons = component.findAllComponents(NButton);

    expect(n_buttons).toHaveLength(3);
  });

  it('should change active btn correctly', () => {
    component.vm.$data.activeButton = 0;

    component.vm.setActiveButton(1);

    expect(component.vm.$data.activeButton).toBe(1);
  });
});
