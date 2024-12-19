import { defineStore } from 'pinia';

interface Item {
  id: number;
  name: string;
}

interface FormViewState {
  items: Item[];
}

export const useFormViewStore = defineStore('formView', {
  state: (): FormViewState => ({
    items: [{ name: 'test', id: 1 }],
  }),
  actions: {
    async loadForms(projectId: number) {
      const ProjectModel = (await import(
        '@/api/modules/project/models/project.model.ts'
        )).default;
      const project = await ProjectModel.getOne(projectId);
      //@ts-ignore
      this.items = project.getData().forms;
    },
    setItems(newItems: Item[]) {
      this.items = newItems;
    },
  },
  getters: {
    getItems(state): Item[] {
      return state.items;
    },
  },
});
