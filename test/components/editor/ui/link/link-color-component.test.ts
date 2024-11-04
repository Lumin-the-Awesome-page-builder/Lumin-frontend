import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import LinkColorComponent from '@/components/editor/UI/link/LinkColorComponent.vue';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import { NButton } from 'naive-ui';

describe('LinkColorComponent', () => {
  let component;
  beforeEach(() => {
    component = mount(LinkColorComponent);
  });

  it('should render correct option heading', () => {
    const optionHeadingComponent = component.findComponent(
      OptionHeadingComponent,
    );
    const headingComponentProps = optionHeadingComponent.props();

    expect(component.findAllComponents(OptionHeadingComponent)).toHaveLength(1);
    expect(headingComponentProps.title).toBe('Link Color');
    expect(headingComponentProps.popoverTitle).toBe('Link color');
    expect(headingComponentProps.popoverText).toBe(
      'Выберите цвет ссылки из доступных типов.',
    );
  });

  it('should render buttons correctly', () => {
    const n_buttons = component.findAllComponents(NButton);

    expect(n_buttons).toHaveLength(8);
    expect(
      n_buttons.every((button, index) => {
        const dataBtn = component.vm.$data.buttons[index];
        const props = button.props();

        return props.color == dataBtn.color;
      }),
    ).toBe(true);
  });

  it('should change active btn correctly', () => {
    component.vm.$data.activeButton = 0;

    component.vm.setActiveButton(1);

    expect(component.vm.$data.activeButton).toBe(1);
  });
});
