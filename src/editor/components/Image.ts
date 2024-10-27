import Component from '@/editor/core/component/Component.ts';
import BorderRadiusProp from '@/editor/properties/BorderRadiusProp.ts';

export default class Image extends Component {
  constructor(_: string) {
    console.log(_);
    super('img');
  }

  name: string = 'image';

  availableProps: string[] = [BorderRadiusProp.name];
}
