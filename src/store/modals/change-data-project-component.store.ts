import { defineStore } from 'pinia';

export const useChangeDataStore = defineStore('changeDataComponent', {
  state: () => ({
    showModal: false,
    projectId: 0,
    projectName: '',
    category: '',
    tags: '',
  }),
  actions: {
    openModal(data: { id: number, name: string, category: string, tags: string }) {
      this.projectId = data.id;
      this.projectName = data.name;
      this.category = data.category;
      this.tags = data.tags;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    update() {
      this.closeModal()
    },
    setProjectName(name) {
      this.projectName = name;
    },
    setCategory(category) {
      this.category = category;
    },
    setTags(tags) {
      this.tags = tags;
    },
  },
});
