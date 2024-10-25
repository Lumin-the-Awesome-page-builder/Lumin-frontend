import Component from '@/editor/core/component/Component';

export default class Container extends Component {
  constructor(_: string) {
    console.log(`Construct ${_}`);
    super('div');
  }
}
