import { describe, expect, it } from 'vitest';
import ListUnstyledProp from '@/editor/properties/text/ListUnstyledProp.ts';

describe('List Unsyled prop test', () => {
  it('Correct class creation', () => {
    const listUnstyledProp = new ListUnstyledProp('value');

    expect(listUnstyledProp.value).toBe('value');
    expect(listUnstyledProp.defaultValue).toStrictEqual([null]);
    expect(listUnstyledProp.availableValues).toStrictEqual([
      {
        checked: 'list-unstyled',
      },
    ]);
    expect(ListUnstyledProp.name).toBe('list-unstyled');
  });

  it('Correct name getter', () => {
    const listUnstyledProp = new ListUnstyledProp('value');

    expect(listUnstyledProp.getName()).toBe('list-unstyled');
  });
});
