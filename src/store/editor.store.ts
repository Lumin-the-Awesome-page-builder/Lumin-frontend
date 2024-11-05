import { defineStore } from 'pinia';
import { App } from '@/editor/App.ts';
import CreateProjectDto from '@/api/modules/project/dto/create-project.dto.ts';
import { generateSlug } from 'random-word-slugs';
import Container from '@/editor/components/Container.ts';
import TokenUtil from '@/utils/token.util.ts';

const useEditorStore = defineStore({
  id: 'editor-store',
  state: () => ({
    //@ts-ignore
    selected: null,
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
      this.use(project.getData());
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

      const initComponent = new Container()
      initComponent.setKeySalt(String(this.selected.id) + String(TokenUtil.getAuthorized().id))
      initComponent.generateKey()
      this.selected.data = JSON.stringify([initComponent.toJson()]);

      await this.save()

      return this.selected
    },
  },
});

export default useEditorStore;
