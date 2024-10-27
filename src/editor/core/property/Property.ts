import Component from '@/editor/core/component/Component.ts';
import Attribute from '@/editor/core/attribute/Attribute.ts';

export type PropertyObject = {
  name: string;
  value: any;
};

export default abstract class Property {
  public abstract title: string;
  public abstract description: string;
  public abstract availableValues: Record<string, any>;
  public abstract defaultValue: string;

  constructor(public value: string) {}

  public apply(target: Component): Component {
    target.attributes.append(
      new Attribute('class', this.availableValues[this.value]),
    );

    return target;
  }

  public abstract getName(): string;
}
