import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useFormDataViewStore } from '@/store/form-data-view.store.ts';

describe('useFormDataViewStore', () => {
  let formDataViewStore;

  beforeEach(async () => {
    setActivePinia(createPinia());
    formDataViewStore = useFormDataViewStore();

    // Мокаем импортируемые модели
    vi.mock('@/api/modules/project/models/project.model.ts', () => ({
      default: {
        getData: vi.fn().mockResolvedValue({
          getData: () => [{ data: JSON.stringify({ key: 'value' }) }],
        }),
        getFields: vi.fn().mockResolvedValue({
          getData: () => ({
            data: JSON.stringify([
              { name: 'Field1', type: 'text' },
              { name: 'Field2', type: 'button' },
            ]),
          }),
        }),
      },
    }));
  });

  it('initializes with default state', () => {
    expect(formDataViewStore.items).toEqual([]);
    expect(formDataViewStore.fields).toEqual([]);
  });

  it('loads data correctly', async () => {
    await formDataViewStore.loadData(1);

    expect(formDataViewStore.items).toEqual([{ key: 'value' }]);
  });

  it('loads fields correctly and filters out buttons', async () => {
    await formDataViewStore.loadFields(1);

    expect(formDataViewStore.fields).toEqual([
      { key: 'Field1', title: 'Field1' },
    ]);
  });
});
