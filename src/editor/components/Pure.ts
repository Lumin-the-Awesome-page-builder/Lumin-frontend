import Component from '@/editor/core/component/Component.ts';
import { PureContentProp } from '@/editor/properties/PureContentProp.ts';

export default class Pure extends Component {
  name: string = 'pure';
  static title: string = 'HTML + CSS + JS';

  availableProps = [PureContentProp.name];

  override render(): HTMLElement {
    this.specific.htmlOnRender.addEventListener('click', (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      this.handler('click', this.findTop(), ev);
    });
    return this.specific.htmlOnRender as HTMLElement;
  }

  getTitle(): string {
    return Pure.title;
  }
}
