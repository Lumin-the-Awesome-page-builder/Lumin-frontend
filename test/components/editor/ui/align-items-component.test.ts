import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import { NButton } from 'naive-ui';
import AlignItemsComponent from '@/components/editor/UI/AlignItemsComponent.vue';
import AlignItemsProp from '@/editor/properties/AlignItemsProp.ts';
import Container from '@/editor/components/Container.ts';

describe('AlignItemsComponent', () => {
  let component;
  beforeEach(() => {
    const prop = new AlignItemsProp([null], new Container('div'));
    component = mount(AlignItemsComponent, {
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
    expect(headingComponentProps.title).toBe('Align Items');
    expect(headingComponentProps.popoverTitle).toBe('Align items');
    expect(headingComponentProps.popoverText).toBe(
      'Свойство align-items в CSS выравнивает элементы по поперечной оси (при расположении в виде строки — по вертикали, при расположении в виде столбца — по горизонтали).',
    );
  });

  it('should render buttons correctly', () => {
    component.vm.activeButton = 0;

    console.log(component.vm.buttons);

    const n_buttons = component.findAllComponents(NButton);

    expect(n_buttons).toHaveLength(5);
  });

  it('should change active btn correctly', () => {
    component.vm.activeButton = 0;

    component.vm.setActiveButton(1, 1);

    expect(component.vm.activeButton).toBe(1);
  });
});
