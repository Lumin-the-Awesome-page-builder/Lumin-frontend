import Property from '../core/property/Property';

export default class FormManagementTypeProp extends Property {
  static name: string = 'form-management-type';

  defaultValue: any[] = [
    'self',
    'https://example.com/save',
    'https://example.com/get',
  ];
  availableValues: Record<any, any>[] = [
    {
      self: 'self',
      service: 'service',
    },
    {
      'https://example.com/save': 'https://example.com/save',
    },
    {
      'https://example.com/get': 'https://example.com/get',
    },
  ];

  getName(): string {
    return FormManagementTypeProp.name;
  }

  apply() {
    this.component.specific = {
      ...this.component.specific,
      handler: this.value[0],
      save_url: this.value[1],
      get_url: this.value[2],
    };
  }

  clear() {
    this.component.specific = {
      ...this.component.specific,
      handler: this.defaultValue[0],
      save_url: this.defaultValue[1],
      get_url: this.defaultValue[2],
    };
  }
}
