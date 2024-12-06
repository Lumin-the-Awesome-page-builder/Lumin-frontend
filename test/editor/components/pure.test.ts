import { describe, expect, it } from 'vitest';
import Pure from '@/editor/components/Pure.ts';
import ComponentNameProp from '@/editor/properties/ComponentNameProp.ts';
import { PureContentProp } from '@/editor/properties/PureContentProp.ts';

describe('Test container component', () => {
  it('Test component creation', () => {
    const pure = new Pure();
    expect(pure.name).toBe('pure');
  });

  it('Test available component props', () => {
    const link = new Pure();
    expect(link.availableProps).toStrictEqual([
      ComponentNameProp.name,
      PureContentProp.name,
    ]);
  });
});
