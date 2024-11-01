import { defineStore } from 'pinia';
import ProjectModel from '@/api/modules/project/models/project.model.ts';
import WidgetModel from '@/api/modules/widget/models/widget.model.ts';

const usePreviewModalStore = defineStore({
  id: 'previewModal',
  state: () => ({
    data: {
      id: 1,
      name: 'Test project',
      date: Date.now(),
      stars: 14,
    },
    isOpen: false,
  }),
  getters: {
    getStatus: (state) => state.isOpen,
    getData: (state) => state.data,
  },
  actions: {
    closeModal() {
      this.isOpen = false;
      this.data = {};
    },
    async openModal(id: number, itemType: string) {
      // Fetch project \ widget by id
      if (itemType == 'project') {
        const data = await ProjectModel.getOne(id);
        if (data.success) this.data = data.getData();
      }

      if (itemType == 'widget') {
        const data = await WidgetModel.getOne(id);
        if (data.success) this.data = data.getData();
      }

      this.isOpen = true;
    },
  },
});
export default usePreviewModalStore;
