import Component from '@/editor/core/component/Component.ts';

export default class Pure extends Component {
  override name: string = 'pure';

  override render(): HTMLElement {
    return this.specific.htmlOnRender as HTMLElement;
  }
}
