import { defineStore } from 'pinia';

interface FormDataViewState {
  items: [];
  fields: [];
}

export const useFormDataViewStore = defineStore('formDataView', {
  state: (): FormDataViewState => ({
    items: [],
    fields: [],
  }),
  actions: {
    async loadData(formUrl: string, formId: number) {
      const ProjectModel = (
        await import('@/api/modules/project/models/project.model.ts')
      ).default;

      const project =
        formUrl != null
          ? await ProjectModel.getCustomData(formUrl)
          : await ProjectModel.getData(formId);
      console.log('PROJECT', project);
      //@ts-ignore
      this.items = project;
    },
    async loadFields(projectId: number) {
      const ProjectModel = (
        await import('@/api/modules/project/models/project.model.ts')
      ).default;
      const project = await ProjectModel.getFields(projectId);
      console.log('PROJECT', project);
      //@ts-ignore
      this.fields = JSON.parse(project.getData().data)
        .filter((el) => el.type != 'button')
        .map((el) => ({ key: el.name, title: el.name }));
    },
  },
});
