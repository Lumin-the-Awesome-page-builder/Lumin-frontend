import Property from '@/editor/core/property/Property.ts';

export default class LinkColorProp extends Property {
  static name: string = 'link-color';

  defaultValue: any[] = ['primary'];
  availableValues: Record<any, any>[] = [
    {
      primary: 'link-primary',
      secondary: 'link-secondary',
      success: 'link-success',
      danger: 'link-danger',
      warning: 'link-warning',
      info: 'link-info',
      light: 'link-light',
      dark: 'link-dark',
    }
  ];

  getName(): string {
    return LinkColorProp.name;
  }
}
