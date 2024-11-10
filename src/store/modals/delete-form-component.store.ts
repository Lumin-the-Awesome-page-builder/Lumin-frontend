import { defineStore } from 'pinia';

const useDeleteModalStore = defineStore('deleteProjectModal', {
  state: () => ({
    project: { id: 0, name: 'Название проекта', itemType: 'project' },
    showModal: false,
  }),
  getters: {
    getProjectName: (state) => state.project.name,
  },
  actions: {
    openModal(project: { id: number; name: string }) {
      this.project = project;
      this.showModal = true;
    },
    async deleteProject() {
      this.closeModal();
      const ProjectModel = await import(
        '@/api/modules/project/models/project.model.ts'
      );
      ProjectModel.default.delete(this.project.id).then(() => {
        window.location.reload();
      });
    },
    async deleteWidget() {
      this.closeModal();
      const WidgetModel = await import(
        '@/api/modules/widget/models/widget.model.ts'
      );
      WidgetModel.default.delete(this.project.id).then(() => {
        window.location.reload();
      });
    },
    closeModal() {
      this.showModal = false;
    },
  },
});
export default useDeleteModalStore;
