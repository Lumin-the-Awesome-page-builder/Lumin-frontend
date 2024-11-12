import Component from '@/editor/core/component/Component';
import AlignItemsProp from '@/editor/properties/AlignItemsProp.ts';
import AlignContentProp from '@/editor/properties/AlignContentProp.ts';
import ColWidthProp from '@/editor/properties/ColWidthProp.ts';
import FlexDirectionProp from '@/editor/properties/FlexDirectionProp.ts';
import FlexProp from '@/editor/properties/FlexProp.ts';
import FlexWrapProp from '@/editor/properties/FlexWrapProp.ts';
import GutterProp from '@/editor/properties/GutterProp.ts';
import JustifyContentProp from '@/editor/properties/JustifyContentProp.ts';
import ComponentNameProp from '@/editor/properties/ComponentNameProp.ts';

export default class Container extends Component {
  constructor(_: string = '') {
    console.log(_);
    super('div');
  }

  availableProps: string[] = [
    ComponentNameProp.name,
    AlignItemsProp.name,
    AlignContentProp.name,
    ColWidthProp.name,
    FlexDirectionProp.name,
    FlexProp.name,
    FlexWrapProp.name,
    GutterProp.name,
    JustifyContentProp.name,
  ];

  render(pure: boolean = false): HTMLElement {
    const rendered = super.render(pure);

    if (!pure) rendered.classList.add('editor-container-item');
    else rendered.classList.remove('editor-container-item');

    return rendered;
  }

  name: string = 'container';
  static title: string = 'Контейнер';
  getTitle() {
    return Container.title;
  }
}
