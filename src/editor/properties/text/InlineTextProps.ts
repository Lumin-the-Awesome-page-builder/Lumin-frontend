import MultipleProperty from '@/editor/core/property/MultipleProperty.ts';

export default class InlineTextProps extends MultipleProperty {
  static name: string = 'inline-text';

  defaultValue: string = 'empty';
  description: string = '___';
  title: string = '___';
  availableValues: Record<string, any> = {
    empty: '',
    mark: 'mark',
    small: 'small',
    textDecorationUnderline: 'text-decoration-underline',
    textDecorationLineThrough: 'text-decoration-line-through',
    textDecorationNone: 'text-decoration-none',
  };

  getName(): string {
    return InlineTextProps.name;
  }
}
