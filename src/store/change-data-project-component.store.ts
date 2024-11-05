import { defineStore } from 'pinia';

export const useChangeDataStore = defineStore('changeDataComponent', {
  state: () => ({
    showModal: false,
    projectName: '',
    category: '',
    tags: '',
  }),
  actions: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
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
