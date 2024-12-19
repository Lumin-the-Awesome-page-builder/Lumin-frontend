import Property from '../core/property/Property';

export default class FormNameProp extends Property {
  static name: string = 'form-name';

  defaultValue: any[] = ['form-name'];
  availableValues: Record<any, any>[] = [
    {
      'form-name': 'form-name',
    },
  ];

  getName(): string {
    return FormNameProp.name;
  }

  apply() {
    this.component.specific = {
      ...this.component.specific,
      name: this.value[0],
    };
  }

  clear() {
    this.component.specific = {
      ...this.component.specific,
      name: this.defaultValue[0],
    };
  }
}
