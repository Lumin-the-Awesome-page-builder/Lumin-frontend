import { describe, expect, it } from 'vitest';
import FlexDirectionProp from '@/editor/properties/FlexDirectionProp.ts';

describe('Flex direction prop test', () => {
  it('Correct class creation', () => {
    const fdProp = new FlexDirectionProp('value');

    expect(fdProp.value).toBe('value');
    expect(fdProp.defaultValue).toStrictEqual(['row']);
    expect(fdProp.availableValues).toStrictEqual([
      {
        col: 'flex-column',
        row: 'flex-row',
      },
    ]);
    expect(FlexDirectionProp.name).toBe('flex-direction');
  });

  it('Correct name getter', () => {
    const fdProp = new FlexDirectionProp('value');

    expect(fdProp.getName()).toBe('flex-direction');
  });
});
