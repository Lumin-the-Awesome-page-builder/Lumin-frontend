import { describe, expect, it } from 'vitest';
import MonoSpaceProp from '@/editor/properties/text/MonoSpaceProp.ts';

describe('Monospace prop test', () => {
  it('Correct class creation', () => {
    const monoSpaceProp = new MonoSpaceProp('value');

    expect(monoSpaceProp.value).toBe('value');
    expect(monoSpaceProp.defaultValue).toStrictEqual([null]);
    expect(monoSpaceProp.availableValues).toStrictEqual([
      {
        checked: 'font-monospace',
      },
    ]);
    expect(MonoSpaceProp.name).toBe('font-monospace');
  });

  it('Correct name getter', () => {
    const monoSpaceProp = new MonoSpaceProp('value');

    expect(monoSpaceProp.getName()).toBe('font-monospace');
  });
});
