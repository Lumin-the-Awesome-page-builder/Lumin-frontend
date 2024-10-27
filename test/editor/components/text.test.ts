import { describe, expect, it } from 'vitest';
import Text from '@/editor/components/Text.ts';

describe('Test text component', () => {
  it('Test component creation', () => {
    const text = new Text('');

    expect(text.elementName).toBe('p');
  });
});
