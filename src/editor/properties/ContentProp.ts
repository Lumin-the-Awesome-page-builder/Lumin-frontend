import Property from '@/editor/core/property/Property.ts';

export default class ContentProp extends Property {
  static name: string = 'content';

  defaultValue: any[] = ['Текст...'];
  availableValues: Record<any, any>[] = [];

  getName(): string {
    return ContentProp.name;
  }

  override setValue(value: any[], index: number = 0) {
    this.clear();
    this.value[index] = value[index];
    this.apply();
  }

  override apply() {
    this.component.content = this.value[0];
    this.component.htmlElement.innerText = this.value[0];
  }

  override clear() {
    this.component.content = '';
    this.component.htmlElement.innerText = '';
  }
}
