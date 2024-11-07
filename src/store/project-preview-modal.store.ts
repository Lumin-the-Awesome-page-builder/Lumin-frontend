import { defineStore } from 'pinia';

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
      let data;
      // Fetch project \ widget by id
      if (itemType == 'project') {
        const ProjectModel = (
          await import('@/api/modules/project/models/project.model.ts')
        ).default;
        data = await ProjectModel.getOne(id);
      }

      if (itemType == 'widget') {
        const WidgetModel = (
          await import('@/api/modules/widget/models/widget.model.ts')
        ).default;
        data = await WidgetModel.getOne(id);
      }

      if (data.success) this.data = data.getData();

      this.isOpen = true;
      return data;
    },
  },
});
export default usePreviewModalStore;
