import { beforeEach, describe, it, expect } from 'vitest';
import NetworkProperty from '@/editor/core/property/NetworkProperty.ts';

describe('NetworkProperty tests', () => {
  class NetworkPropertyMock extends NetworkProperty<string> {
    name: string = 'Network';

    append_url: string = 'https://google.com/append';
    fetch_url: string = 'https://google.com/get';

    defaultValue: string = 'def';
    description: string = 'desc';
    title: string = 'title';

    getName(): string {
      return NetworkPropertyMock.name;
    }
  }

  let property: NetworkPropertyMock;

  beforeEach(() => {
    //@ts-ignore
    property = new NetworkPropertyMock();
    console.log(property);
  });

  it('', () => {
    expect(true).toBe(true);
  });
});
