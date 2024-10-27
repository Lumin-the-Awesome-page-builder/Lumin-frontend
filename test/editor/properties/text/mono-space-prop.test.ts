import { describe, expect, it } from 'vitest';
import MonoSpaceProp from '@/editor/properties/text/MonoSpaceProp.ts';

describe('Monospace prop test', () => {
  it('Correct class creation', () => {
    const monoSpaceProp = new MonoSpaceProp('value');

    expect(monoSpaceProp.value).toBe('value');
    expect(monoSpaceProp.defaultValue).toBe('monospace');
    expect(monoSpaceProp.description).toBe('___');
    expect(monoSpaceProp.title).toBe('___');
    expect(monoSpaceProp.availableValues).toStrictEqual({
      monospace: 'font-monospace',
    });
    expect(MonoSpaceProp.name).toBe('font-monospace');
  });

  it('Correct name getter', () => {
    const monoSpaceProp = new MonoSpaceProp('value');

    expect(monoSpaceProp.getName()).toBe('font-monospace');
  });
});
