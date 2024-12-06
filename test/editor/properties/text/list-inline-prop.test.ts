import { describe, expect, it } from 'vitest';
import ListInlineProp from '@/editor/properties/text/ListInlineProp.ts';

describe('List Inline prop test', () => {
  it('Correct class creation', () => {
    const listInlineProp = new ListInlineProp('value');

    expect(listInlineProp.value).toBe('value');
    expect(listInlineProp.defaultValue).toStrictEqual([null]);
    expect(listInlineProp.availableValues).toStrictEqual([
      {
        checked: 'list-inline',
      },
    ]);
    expect(ListInlineProp.name).toBe('list-inline');
  });

  it('Correct name getter', () => {
    const listInlineProp = new ListInlineProp('value');

    expect(listInlineProp.getName()).toBe('list-inline');
  });
});
