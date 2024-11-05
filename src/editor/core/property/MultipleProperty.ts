import Property from '@/editor/core/property/Property.ts';
import Component from '@/editor/core/component/Component.ts';

export default abstract class MultipleProperty extends Property {
  public abstract availableValues: Record<number, any>[];
  public abstract defaultValue: number[];

  constructor(public values: any[], public component: Component) {
    super(values, component);
  }

  override clear() {
    this.values.forEach((el, index) => {
      if (el != null) {
        el.forEach((el) => {
          this.component.htmlElement.classList.remove(this.availableValues[index][el]);
        })
      }
    })
  }

  override apply() {
    this.values.forEach((el, index) => {
      if (el != null) {
        el.forEach((el) => {
          this.component.htmlElement.classList.add(this.availableValues[index][el]);
        })
      }
    })
  }

  public abstract getName(): string;
}
