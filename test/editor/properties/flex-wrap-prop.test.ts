import { describe, expect, it } from 'vitest';
import FlexWrapProp from '@/editor/properties/FlexWrapProp.ts';

describe('Flex wrap prop test', () => {
  it('Correct class creation', () => {
    const fdProp = new FlexWrapProp('value');

    expect(fdProp.value).toBe('value');
    expect(fdProp.defaultValue).toBe('flex-wrap');
    expect(fdProp.description).toBe('___');
    expect(fdProp.title).toBe('___');
    expect(fdProp.values).toStrictEqual({ 'flex-wrap': 'flex-wrap' });
    expect(FlexWrapProp.name).toBe('flex-wrap');
  });

  it('Correct name getter', () => {
    const fdProp = new FlexWrapProp('value');

    expect(fdProp.getName()).toBe('flex-wrap');
  });
});
