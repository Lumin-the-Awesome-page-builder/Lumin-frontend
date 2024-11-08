import { defineStore } from 'pinia';

const useChangeDataStore = defineStore('changeDataComponent', {
  state: () => ({
    showModal: false,
    projectId: 0,
    projectName: '',
    category: '',
    tags: '',
  }),
  actions: {
    openModal(data: {
      id: number;
      name: string;
      category: string;
      tags: string;
    }) {
      this.projectId = data.id;
      this.projectName = data.name;
      this.category = data.category;
      this.tags = data.tags;
      this.showModal = true;
    },
    async update() {
      const updateData = { id: this.projectId };
      if (this.projectName != '') {
        updateData.name = this.projectName;
      }
      if (this.category != '') {
        updateData.category = this.category;
      }
      if (this.tags != '') {
        updateData.tags = this.tags;
      }
      console.log(updateData.tags);
      const ProjectModel = await import(
        '@/api/modules/project/models/project.model.ts'
      );
      ProjectModel.default.update(this.projectId, updateData).then(() => {});
      this.closeModal();
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
export default useChangeDataStore;
