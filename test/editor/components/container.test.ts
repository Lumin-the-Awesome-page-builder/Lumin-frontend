import { describe, expect, it } from 'vitest';
import Container from '@/editor/components/Container.ts';

describe("Test container component", () => {
  it("Test component creation", () => {
    const container = new Container("")

    expect(container.elementName).toBe("div")
  })
})