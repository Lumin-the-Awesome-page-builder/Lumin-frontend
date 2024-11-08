import { defineStore } from 'pinia';
import LibraryModel from '@/api/modules/library/models/library.model.ts';
import ProjectModel from '@/api/modules/project/models/project.model.ts';
import WidgetModel from '@/api/modules/widget/models/widget.model.ts';
import Packager from '@/editor/core/Packager.ts';
import { getEditorInstance } from '@/editor/plugin.ts';
import JSZip from 'jszip';

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
    createBlob(data): Blob {
      const app = getEditorInstance();
      app.initState = JSON.parse(data);
      const packager = new Packager(app);
      return packager.blob();
    },
    createLink(downloadName, blob) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = downloadName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    async loadProjects() {
      const loaded = await LibraryModel.getProjects();
      if (loaded.success) {
        this.contentType = 'project';
        this.data = loaded.getData();
      }
      return loaded;
    },
    async loadWidgets() {
      const loaded = await LibraryModel.getWidgets();
      if (loaded.success) {
        this.contentType = 'widget';
        this.data = loaded.getData();
      }
      return loaded;
    },
    async removeById(id) {
      if (this.contentType == 'project') {
        return await ProjectModel.delete(Number(id));
      } else if (this.contentType == 'widget') {
        return await WidgetModel.delete(Number(id));
      }
    },
    async removeSelected() {
      const result = await Promise.all(
        Object.keys(this.selected).map(this.removeById),
      );
      if (this.contentType == 'widget') {
        result.push(await this.loadWidgets());
      } else if (this.contentType == 'project') {
        result.push(await this.loadProjects());
      }
      return result;
    },
    async downloadProject(id) {
      let blob = new Blob();
      let name = '';
      let result;
      if (this.contentType == 'project') {
        result = await ProjectModel.getOne(Number(id));
        const data = result.getData();

        blob = this.createBlob(data.data);
        name = data.name;
      } else if (this.contentType == 'widget') {
        result = await WidgetModel.getOne(Number(id));
        const data = result.getData();

        blob = this.createBlob(data.data);
        name = data.name;
      }
      this.createLink(`${name}.html`, blob);
      return result;
    },
    async downloadSelected() {
      const zip = JSZip();
      let result;
      await Promise.all(
        Object.keys(this.selected).map(async (id) => {
          if (this.contentType == 'project') {
            result = await ProjectModel.getOne(Number(id));
            const data = result.getData();

            const blob = this.createBlob(data.data);
            zip.file(`${data.name}${id}.html`, blob);
          } else if (this.contentType == 'widget') {
            result = await WidgetModel.getOne(Number(id));
            const data = result.getData();

            const blob = this.createBlob(data.data);
            zip.file(`${data.name}${id}.html`, blob);
          }
        }),
      );
      const zipped = await zip.generateAsync({ type: 'blob' });
      this.createLink('projects.zip', zipped);
      return result;
    },
    toggleSelected(id) {
      if (this.selected[id]) delete this.selected[id];
      else this.selected[id] = true;
    },
  },
});

export default useDashboardStore;
