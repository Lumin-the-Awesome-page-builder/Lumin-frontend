import Property from '@/editor/core/property/Property.ts';
import Component from '@/editor/core/component/Component.ts';

export class PureContentProp extends Property {
  static name = 'pure-content';

  constructor(value: any[] = [], component: Component) {
    super([component.specific.html], component);
    this.defaultValue = [component.specific.html];
  }

  public clear() {
    this.component.specific.html = ""
  }

  public apply() {}

  public setValue(value: any[], index = 0) {
    this.clear();
    this.component.specific.html = value[index]
  }

  public getName() { return PureContentProp.name }
}