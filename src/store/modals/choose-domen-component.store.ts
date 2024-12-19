import { defineStore } from 'pinia';

export const useChooseDomainStore = defineStore('chooseDomainComponent', {
  state: () => ({
    showModal: false,
    domain: '',
  }),
  actions: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    setDomain(domain: string) {
      this.domain = domain;
    },
    async save(projectId: number) {
      const ProjectModel = (await import(
        '@/api/modules/project/models/project.model.ts'
      )).default;

      await ProjectModel.setDomain(projectId, this.domain);
    }
  },
});
