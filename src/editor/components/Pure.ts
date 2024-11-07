import Component from '@/editor/core/component/Component.ts';

export default class Pure extends Component {
  name: string = 'pure';
  static title: string = 'HTML + CSS + JS';

  availableProps = [];

  override render(): HTMLElement {
    return this.specific.htmlOnRender as HTMLElement;
  }
}
