import Property from '@/editor/core/property/Property.ts';
import Component from '@/editor/core/component/Component.ts';

export default class ComponentNameProp extends Property {
  static name: string = 'component-name';

  defaultValue: any[] = [''];
  availableValues: Record<any, any>[] = [];

  constructor(
    public value: any[] = [],
    public component: Component,
  ) {
    if (!value.length)
      value.push(component.getTitle())
    super(value, component)
    this.defaultValue = [component.getTitle()]
  }

  public clear() {
    this.component.userName = this.component.getTitle()
  }

  public apply() {
    this.component.userName = this.value[0]
  }

  public setValue(value: any[], index = 0) {
    this.clear();
    this.value[index] = value[index];
    this.apply();
  }

  getName(): string {
    return ComponentNameProp.name;
  }
}