import Component from '@/editor/core/component/Component.ts';
import BorderRadiusProp from '@/editor/properties/BorderRadiusProp.ts';
import ComponentNameProp from '@/editor/properties/ComponentNameProp.ts';

export default class Image extends Component {
  constructor(_: string) {
    console.log(_);
    super('img');
  }

  name: string = 'image';
  static title: string = 'Картинка';

  availableProps: string[] = [
    ComponentNameProp.name,
    BorderRadiusProp.name
  ];
  getTitle() {
    return Image.title;
  }
}
