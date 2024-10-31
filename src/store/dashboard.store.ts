import { defineStore } from 'pinia';
import LibraryModel from '@/api/modules/library/models/library.model.ts';

const useDashboardStore = defineStore({
  id: 'dashboard',
  state: () => ({
    data: [],
    contentType: 'project',
    selected: {},
  }),
  getters: {
    getData: (state) =>
      state.data.map((el) => {
        return {
          ...el,
          imageSrc: '../src/assets/imageCard/screenshot.png',
          date: new Date(el.created_at),
        };
      }),
    getType: (state) => state.contentType,
    getSelected: (state) => state.selected,
  },
  actions: {
    async loadProjects() {
      const loaded = await LibraryModel.getProjects();
      if (loaded.success) {
        this.contentType = 'project';
        this.data = loaded.getData();
      }
    },
    async loadWidgets() {
      const loaded = await LibraryModel.getWidgets();
      if (loaded.success) {
        this.contentType = 'widget';
        this.data = loaded.getData();
      }
    },
    async removeSelected() {
      alert(`REMOVED ${JSON.stringify(this.selected)}`);
    },
    async downloadSelected() {
      alert(`DOWNLOAD ${JSON.stringify(this.selected)}`);
    },
    toggleSelected(id) {
      if (this.selected[id]) delete this.selected[id];
      else this.selected[id] = true;
    },
  },
});

export default useDashboardStore;
