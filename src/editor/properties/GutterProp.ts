import Property from '../core/property/Property';

export default class GutterProp extends Property {
  static name: string = 'gap';

  defaultValue: string = 'g0';
  description: string = '___';
  title: string = '___';
  values: Record<string, any> = {
    g0: 'gap-0',
    g1: 'gap-1',
    g2: 'gap-2',
    g3: 'gap-3',
    g4: 'gap-4',
    g5: 'gap-5',
  };

  getName(): string {
    return GutterProp.name;
  }
}
