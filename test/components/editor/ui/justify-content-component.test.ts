import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import { NButton } from 'naive-ui';
import JustifyContentComponent from '@/components/editor/UI/JustifyContentComponent.vue';

describe('JustifyContentComponent', () => {
  let component;
  beforeEach(() => {
    component = mount(JustifyContentComponent);
  });

  it('should render correct option heading', () => {
    const optionHeadingComponent = component.findComponent(
      OptionHeadingComponent,
    );
    const headingComponentProps = optionHeadingComponent.props();

    expect(component.findAllComponents(OptionHeadingComponent)).toHaveLength(1);
    expect(headingComponentProps.title).toBe('Justify Content');
    expect(headingComponentProps.popoverTitle).toBe('Justify content');
    expect(headingComponentProps.popoverText).toBe(
      'Свойство justify-content в CSS определяет, как браузер распределяет пространство вокруг флекс-элементов вдоль главной оси контейнера.',
    );
  });

  it('should render buttons correctly', () => {
    const activeButtonIndex = 1;
    component.vm.$data.activeButton = activeButtonIndex;

    const n_buttons = component.findAllComponents(NButton);

    expect(n_buttons).toHaveLength(6);
  });

  it('should change active btn correctly', () => {
    component.vm.$data.activeButton = 0;

    component.vm.setActiveButton(1);

    expect(component.vm.$data.activeButton).toBe(1);
  });
});
