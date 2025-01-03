import { defineStore } from 'pinia';

const useCursorStore = defineStore({
  id: 'cursor-store',
  state: () => ({
    cursors: {},
  }),
  getters: {
    getCursors: (state) => state.cursors,
  },
  actions: {
    updateCoordinates(userId: number, x: number, y: number) {
      this.cursors[userId] = { x: x, y: y };
    },
    deleteCursor(userId: number) {
      delete this.cursors[userId];
    },
  },
});

export default useCursorStore;
