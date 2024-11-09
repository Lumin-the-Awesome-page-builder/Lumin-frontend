import Component from '@/editor/core/component/Component.ts';
import { PureContentProp } from '@/editor/properties/PureContentProp.ts';
import ComponentNameProp from '@/editor/properties/ComponentNameProp.ts';

export default class Pure extends Component {
  name: string = 'pure';
  static title: string = 'HTML + CSS + JS';

  availableProps = [
    ComponentNameProp.name,
    PureContentProp.name
  ];

  override render(): HTMLElement {
    this.specific.htmlOnRender.addEventListener('click', (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      this.handler('click', this.findTop(), ev);
    });
    this.applyProps()
    return this.specific.htmlOnRender as HTMLElement;
  }

  getTitle(): string {
    return Pure.title;
  }
}
