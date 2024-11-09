import { defineStore } from 'pinia';
import appConf from '@/api/conf/app.conf.ts';

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
    getData: (state) => {
      const previewName = state.data.preview
        ? state.data.preview
        : 'no-preview.png';
      return {
        ...state.data,
        preview: `${appConf.proto}://${appConf.endpoint}/lumin/file/${previewName}`,
      };
    },
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
      console.log(data);
      this.isOpen = true;
      return data;
    },
  },
});
export default usePreviewModalStore;
