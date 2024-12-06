import { beforeEach, describe, vi, it, expect } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import useComponentSetupStore from '@/store/component-setup.store.ts';
import PatchProjectTreeDto from '@/api/modules/project/dto/patch-project-tree.dto.ts';

vi.mock('@/api/modules/project/models/project.model.ts', () => {
  return {
    default: {
      patchTree: vi.fn(),
    },
  };
});

describe('ComponentSetupStore tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('test selectComponent (current component is null)', async () => {
    const store = useComponentSetupStore();
    store.component = null;
    const setSelectedMock = vi.fn();

    await store.selectComponent({ setSelected: setSelectedMock });

    expect(store.component).toEqual({ setSelected: setSelectedMock });
    expect(setSelectedMock).toBeCalled();
  });

  it('test selectComponent (current component not null)', async () => {
    const store = useComponentSetupStore();
    const toJsonMock = vi.fn(() => 'test');
    const findTopMock = vi.fn(() => [{ key: 'key' }]);
    const removeSelectedMock = vi.fn();
    const setSelectedMock = vi.fn();
    store.component = {
      toJson: toJsonMock,
      findTop: findTopMock,
      removeSelected: removeSelectedMock,
    };
    const getItemMock = vi.fn(() => 123);
    vi.stubGlobal('localStorage', {
      getItem: getItemMock,
    });
    const patchProjectDto = new PatchProjectTreeDto(['key'], 'test');
    const ProjectModel = (
      await import('@/api/modules/project/models/project.model.ts')
    ).default;

    await store.selectComponent({ setSelected: setSelectedMock });

    expect(store.component).toEqual({ setSelected: setSelectedMock });
    expect(findTopMock).toBeCalled();
    expect(getItemMock).toBeCalledWith('selected-project');
    expect(removeSelectedMock).toBeCalled();
    expect(setSelectedMock).toBeCalled();
    expect(ProjectModel.patchTree).toBeCalledWith(123, patchProjectDto);
  });
});
