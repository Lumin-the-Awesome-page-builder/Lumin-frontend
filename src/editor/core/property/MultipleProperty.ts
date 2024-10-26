import Component from '@/editor/core/component/Component.ts';
import Attribute from '@/editor/core/attribute/Attribute.ts';

export default abstract class MultipleProperty {
  public abstract title: string;
  public abstract description: string;
  public abstract availableValues: Record<string, any>;
  public abstract defaultValue: string;

  protected constructor(public values: []) {}

  public apply(target: Component): Component {
    this.values.forEach((value) => {
      target.attributes.append(
        new Attribute('class', this.availableValues[value]),
      );
    });
    return target;
  }

  public abstract getName(): string;
}
