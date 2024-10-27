import { describe, expect, it } from 'vitest';
import Header from '@/editor/components/Header.ts';

describe('Test header component', () => {
  it('Test component creation', () => {
    [1, 2, 3, 4, 5, 6].forEach((level) => {
      const header = new Header(level);

      expect(header.elementName).toBe(`h${level}`);
    });
  });
});
