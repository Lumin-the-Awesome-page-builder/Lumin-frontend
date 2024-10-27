import Property from '../../core/property/Property.ts';

export default class LinkUnderlineProp extends Property {
  static name: string = 'link-underline';

  defaultValue: string = 'primary';
  description: string = '___';
  title: string = '___';
  availableValues: Record<string, any> = {
    primary: 'link-underline-primary',
    secondary: 'link-underline-secondary',
    success: 'link-underline-success',
    danger: 'link-underline-danger',
    warning: 'link-underline-warning',
    info: 'link-underline-info',
    light: 'link-underline-light',
    dark: 'link-underline-dark',
  };

  getName(): string {
    return LinkUnderlineProp.name;
  }
}
