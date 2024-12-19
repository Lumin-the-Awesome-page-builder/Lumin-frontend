import { defineStore } from 'pinia';

interface Item {
  id: number;
  name: string;
}

interface FormViewState {
  items: Item[];
}

export const useFormViewStore = defineStore('formView', {
  state: (): FormViewState => ({
    items: [{ name: 'test', id: 1 }],
  }),
  actions: {
    setItems(newItems: Item[]) {
      this.items = newItems;
    },
  },
  getters: {
    getItems(state): Item[] {
      return state.items;
    },
  },
});
