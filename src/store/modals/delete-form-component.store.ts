import { defineStore } from 'pinia';

const useDeleteProjectModalStore = defineStore('deleteProjectModal', {
  state: () => ({
    project: { id: 0, name: 'Название проекта' },
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
      ProjectModel.default.delete(this.project.project.id).then(() => {
        window.location.reload();
      });
    },
    closeModal() {
      this.showModal = false;
    },
  },
});
export default useDeleteProjectModalStore;
