import { defineStore } from 'pinia';
import ProjectDto from '@/api/modules/project/dto/project.dto.ts';
import { App } from '@/editor/App.ts';
import CreateProjectDto from '@/api/modules/project/dto/create-project.dto.ts';
import { generateSlug } from 'random-word-slugs';

const useEditorStore = defineStore({
  id: 'editor-store',
  state: () => ({
    //@ts-ignore
    selected: new ProjectDto(),
    app: new App(),
  }),
  getters: {
    getProject: (state) => state.selected,
    getTree: (state) => state.selected.data,
  },
  actions: {
    async useById(id: number) {
      const ProjectModel = await import(
        '@/api/modules/project/models/project.model.ts'
      );
      const project = await ProjectModel.default.getOne(id);
      this.use(project);
    },
    use(projectDto: any) {
      this.selected = projectDto;
    },
    setApp(app: any) {
      this.app = app;
    },
    async save() {
      const ProjectModel = await import(
        '@/api/modules/project/models/project.model.ts'
      );
      return await ProjectModel.default.update(this.selected.id, this.selected);
    },
    async openNew() {
      const newProject = new CreateProjectDto(generateSlug(2), '[]', [], 1);
      const ProjectModel = await import(
        '@/api/modules/project/models/project.model.ts'
      );
      this.selected = (await ProjectModel.default.create(newProject)).getData();
    },
  },
});

export default useEditorStore;
