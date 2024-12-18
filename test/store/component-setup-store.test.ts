import { beforeEach, describe, vi, it, expect } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import useComponentSetupStore from '@/store/component-setup.store.ts';

describe('ComponentSetupStore tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('test selectComponent (current component is null)', async () => {
    const store = useComponentSetupStore();
    store.component = null;
    store.ws = {
      blockComponent: vi.fn(),
    };
    const setSelectedMock = vi.fn();

    await store.selectComponent({ setSelected: setSelectedMock });

    expect(store.component).toEqual({ setSelected: setSelectedMock });
    expect(store.ws.blockComponent).toBeCalled();
    expect(setSelectedMock).toBeCalled();
  });

  it('test selectComponent (current component not null)', async () => {
    const store = useComponentSetupStore();
    const removeSelectedMock = vi.fn();
    const setSelectedMock = vi.fn();
    const component = {
      removeSelected: removeSelectedMock,
    };
    store.component = component;
    store.ws = {
      blockComponent: vi.fn(),
      releaseComponent: vi.fn(),
    };
    const componentOnSelect = { setSelected: setSelectedMock };

    await store.selectComponent(componentOnSelect);

    expect(removeSelectedMock).toBeCalled();
    expect(store.ws.releaseComponent).toBeCalledWith(component);
    expect(store.component).toEqual({ setSelected: setSelectedMock });
    expect(store.ws.blockComponent).toBeCalledWith(componentOnSelect);
    expect(setSelectedMock).toBeCalled();
  });
});
