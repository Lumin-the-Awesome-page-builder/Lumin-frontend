import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useFormViewStore } from '@/store/form-view.store.ts';

describe('useFormViewStore', () => {
  let formViewStore;

  beforeEach(async () => {
    setActivePinia(createPinia());
    formViewStore = useFormViewStore();

    // Мокаем импортируемую модель
    vi.mock('@/api/modules/project/models/project.model.ts', () => ({
      default: {
        getOne: vi.fn().mockResolvedValue({
          getData: () => ({
            forms: [
              { id: 2, name: 'form1' },
              { id: 3, name: 'form2' },
            ],
          }),
        }),
      },
    }));
  });

  it('initializes with default state', () => {
    expect(formViewStore.items).toEqual([{ name: 'test', id: 1 }]); // Проверяем начальное состояние items
  });

  it('loads forms correctly', async () => {
    await formViewStore.loadForms(1); // Загружаем формы с projectId = 1

    expect(formViewStore.items).toEqual([
      { id: 2, name: 'form1' },
      { id: 3, name: 'form2' },
    ]); // Проверяем обновление items
  });

  it('sets items correctly', () => {
    const newItems = [{ id: 4, name: 'form3' }];
    formViewStore.setItems(newItems); // Устанавливаем новые элементы

    expect(formViewStore.items).toEqual(newItems); // Проверяем обновление items
  });

  it('returns items via getter', () => {
    const items = formViewStore.getItems; // Получаем элементы через геттер

    expect(items).toEqual([{ name: 'test', id: 1 }]); // Проверяем, что геттер возвращает правильные элементы
  });
});
