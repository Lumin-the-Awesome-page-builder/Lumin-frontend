import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import { NButton } from 'naive-ui';
import AlignContentComponent from '@/components/editor/UI/AlignContentComponent.vue';

describe('AlignContentComponent', () => {
  let component;
  beforeEach(() => {
    component = mount(AlignContentComponent);
  });

  it('should render correct option heading', () => {
    const optionHeadingComponent = component.findComponent(
      OptionHeadingComponent,
    );
    const headingComponentProps = optionHeadingComponent.props();

    expect(component.findAllComponents(OptionHeadingComponent)).toHaveLength(1);
    expect(headingComponentProps.title).toBe('Align Content');
    expect(headingComponentProps.popoverTitle).toBe('Align content');
    expect(headingComponentProps.popoverText).toBe(
      'Свойство align-content в CSS управляет распределением свободного пространства по поперечной оси между строками элементов внутри флекс- и грид-контейнеров, а также внутри блочных элементов.',
    );
  });

  it('should render buttons correctly', () => {
    const activeButtonIndex = 0;
    component.vm.$data.activeButton = activeButtonIndex;

    console.log(component.vm.$data.buttons);

    const n_buttons = component.findAllComponents(NButton);

    expect(n_buttons).toHaveLength(5);
  });

  it('should change active btn correctly', () => {
    component.vm.$data.activeButton = 0;

    component.vm.setActiveButton(1);

    expect(component.vm.$data.activeButton).toBe(1);
  });
});
