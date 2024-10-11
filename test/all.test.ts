import { expect, test } from 'vitest';
import { sum } from '../src/sum.ts';
import { sub } from '../src/sub';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
test('3 - 2 to equal 1', () => {
  expect(sub(3, 2)).toBe(1);
});
test('5 - 1 to equal 4', () => {
  expect(sub(5, 1)).toBe(4);
});
