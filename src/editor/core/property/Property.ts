import Component from '@/editor/core/component/Component.ts';

export type PropertyObject = {
  name: string;
  value: any;
};

export default abstract class Property {
  public abstract availableValues: Record<any, any>[];
  public abstract defaultValue: any[];

  constructor(
    public value: any[],
    public component: Component,
  ) {}

  public clear() {
    this.value.forEach((el, index) => {
      if (el != null) {
        this.component.htmlElement.classList.remove(
          this.availableValues[index][el],
        );
      }
    });
  }

  public apply() {
    this.value.forEach((el, index) => {
      if (el != null) {
        this.component.htmlElement.classList.add(
          this.availableValues[index][el],
        );
      }
    });
  }

  public setValue(value: any[], index = 0) {
    this.clear();
    this.value[index] = value;
    this.apply();
  }

  public abstract getName(): string;
}
