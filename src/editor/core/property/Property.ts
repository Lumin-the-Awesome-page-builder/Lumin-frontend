import Component from '@/editor/core/component/Component.ts';
import Attribute from '@/editor/core/attribute/Attribute.ts';

export type PropertyObject = {
  name: string;
  value: any;
};

export default abstract class Property {
  public abstract availableValues: Record<any, any>[];
  public abstract defaultValue: any[];

  constructor(protected value: any[], public component: Component) {}

  public clear() {
    this.value.forEach((el, index) => {
      if (el != null) {
        this.component.htmlElement.classList.remove(this.availableValues[index][el]);
      }
    })
  }

  public apply() {
    this.value.forEach((el, index) => {
      if (el != null) {
        this.component.htmlElement.classList.add(this.availableValues[index][el]);
      }
    })
  }

  public setValue(value: any[], index = 0) {
    this.clear()
    this.value[index] = value
    this.apply()

    console.log(this.component.htmlElement)
  }

  public abstract getName(): string;
}
