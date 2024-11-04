import { defineStore } from 'pinia';

const useContextMenuStore = defineStore({
  id: 'ContextMenuStore',
  state: () => ({
    isVisible: false,
    selected: null,
    position: {
      x: 0,
      y: 0,
    },
    items: [],
  }),
  getters: {
    getSelected: (state) => state.selected,
    getVisible: (state) => state.visible,
    getItems: (state) => state.items,
    getPosition: (state) => state.position,
  },
  actions: {
    init(items) {
      this.items = items;
    },
    select(item) {
      this.selected = item;
    },
    open(position) {
      this.isVisible = true;
      this.position = position;
    },
    close() {
      this.isVisible = false;
      this.position = { x: 0, y: 0 };
    },
  },
});

export default useContextMenuStore;
