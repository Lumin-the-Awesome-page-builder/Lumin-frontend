import { describe, expect, it } from 'vitest';
import AlignContentProp from '@/editor/properties/AlignContentProp.ts';

describe('Align Self prop test', () => {
  it('Correct class creation', () => {
    const alignContentProp = new AlignContentProp('value');

    expect(alignContentProp.value).toBe('value');
    expect(alignContentProp.defaultValue).toStrictEqual(['start']);
    expect(alignContentProp.availableValues).toStrictEqual([
      {
        center: 'align-content-center',
        end: 'align-content-end',
        start: 'align-content-start',
        between: 'align-content-between',
        around: 'align-content-around',
      },
    ]);
    expect(AlignContentProp.name).toBe('align-content');
  });

  it('Correct name getter', () => {
    const alignContentProp = new AlignContentProp('value');

    expect(alignContentProp.getName()).toBe('align-content');
  });
});
