import { describe, expect, it } from 'vitest';
import Link from '@/editor/components/Link.ts';

describe('Test link component', () => {
  it('Test component creation', () => {
    const link = new Link('');

    expect(link.elementName).toBe('a');
  });
});
