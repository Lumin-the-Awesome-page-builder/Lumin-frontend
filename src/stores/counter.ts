import { defineStore } from 'pinia';

const useCounterStore = defineStore('main', {
  state: () => ({ count: 0, name: 'Eduardo' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment(n: number = 1) {
      this.count += n;
    },
  },
});

export default useCounterStore;
