import Component from '@/editor/core/component/Component.ts';
import BorderRadiusProp from '@/editor/properties/BorderRadiusProp.ts';

export default class Image extends Component {
  constructor(_: string) {
    console.log(_);
    super('img');
  }

  name: string = 'image';
  static title: string = 'Картинка';

  availableProps: string[] = [BorderRadiusProp.name];
  getTitle() {
    return Image.title;
  }
}
