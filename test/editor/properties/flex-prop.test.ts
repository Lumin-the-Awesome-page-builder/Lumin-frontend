import { describe, expect, it } from 'vitest';
import FlexProp from '@/editor/properties/FlexProp.ts';

describe('Flex prop test', () => {
  it('Correct class creation', () => {
    const fdProp = new FlexProp('value');

    expect(fdProp.value).toBe('value');
    expect(fdProp.defaultValue).toStrictEqual(['flex']);
    expect(fdProp.availableValues).toStrictEqual([{ flex: 'd-flex' }]);
    expect(FlexProp.name).toBe('flex');
  });

  it('Correct name getter', () => {
    const fdProp = new FlexProp('value');

    expect(fdProp.getName()).toBe('flex');
  });
});
