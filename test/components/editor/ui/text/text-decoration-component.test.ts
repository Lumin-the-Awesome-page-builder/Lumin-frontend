import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import { NButton } from 'naive-ui';
import TextDecorationComponent from '@/components/editor/UI/text/TextDecorationComponent.vue';
import Text from '@/editor/components/Text.ts';
import TextDecorationProp from '@/editor/properties/text/TextDecorationProp.ts';

describe('TextDecorationComponent', () => {
  let component;
  beforeEach(() => {
    const prop = new TextDecorationProp([1], new Text());
    component = mount(TextDecorationComponent, {
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
    expect(headingComponentProps.title).toBe('Text Decoration');
    expect(headingComponentProps.popoverTitle).toBe('Text decoration');
    expect(headingComponentProps.popoverText).toBe(
      'Подчеркнутый, зачеркнутый или обычный',
    );
  });

  it('should render buttons correctly', () => {
    component.vm.activeButton = 0;

    const n_buttons = component.findAllComponents(NButton);

    expect(n_buttons).toHaveLength(3);
  });

  it('should change active btn correctly', () => {
    component.vm.activeButton = 0;

    component.vm.setActiveButton(1, 1);

    expect(component.vm.activeButton).toBe(1);
    expect();
  });
});
