import { defineStore } from 'pinia';
import appConf from '@/api/conf/app.conf.ts';
import LibraryModel from '@/api/modules/library/models/library.model.ts';

const useWidgetLibraryStore = defineStore({
  id: 'widget-library-store',
  state: () => ({
    data: [],
    contentType: 'project',
    selected: {},
  }),
  getters: {
    getData: (state) =>
      state.data.map((el) => {
        const previewName = el.preview ? el.preview : 'no-preview.png';
        return {
          ...el,
          preview: `${appConf.proto}://${appConf.endpoint}/lumin/file/${previewName}`,
          date: new Date(el.created_at),
        };
      }),
  },
  actions: {
    async loadWidgets() {
      const loaded = await LibraryModel.getWidgets();
      if (loaded.success) {
        this.contentType = 'widget';
        this.data = loaded.getData();
      }
      return loaded;
    },
    async loadWidgetData(id: number) {
      const WidgetModel = (
        await import('@/api/modules/widget/models/widget.model.ts')
      ).default;
      return await WidgetModel.getOne(id);
    },
  },
});

export default useWidgetLibraryStore;
