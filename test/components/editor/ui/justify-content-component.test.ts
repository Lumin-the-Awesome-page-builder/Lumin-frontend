import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import { NButton } from 'naive-ui';
import JustifyContentComponent from '@/components/editor/UI/JustifyContentComponent.vue';
import Container from '@/editor/components/Container.ts';
import JustifyContentProp from '@/editor/properties/JustifyContentProp.ts';

describe('JustifyContentComponent', () => {
  let component;
  beforeEach(() => {
    const prop = new JustifyContentProp([null], new Container('div'));
    component = mount(JustifyContentComponent, {
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
    expect(headingComponentProps.title).toBe('Justify Content');
    expect(headingComponentProps.popoverTitle).toBe('Justify content');
    expect(headingComponentProps.popoverText).toBe(
      'Свойство justify-content в CSS определяет, как браузер распределяет пространство вокруг флекс-элементов вдоль главной оси контейнера.',
    );
  });

  it('should render buttons correctly', () => {
    component.vm.activeButton = 1;

    const n_buttons = component.findAllComponents(NButton);

    expect(n_buttons).toHaveLength(6);
  });

  it('should change active btn correctly', () => {
    component.vm.activeButton = 0;

    component.vm.setActiveButton(1, 1);

    expect(component.vm.activeButton).toBe(1);
  });
});
