import { defineStore } from 'pinia';
import { App } from '@/editor/App.ts';
import CreateProjectDto from '@/api/modules/project/dto/create-project.dto.ts';
import { generateSlug } from 'random-word-slugs';
import Container from '@/editor/components/Container.ts';
import TokenUtil from '@/utils/token.util.ts';
import Packager from '@/editor/core/Packager.ts';

const useEditorStore = defineStore({
  id: 'editor-store',
  state: () => ({
    //@ts-ignore
    selected: null,
    app: new App(),
    blockOnCreate: {
      icon: null,
      component: null
    },
  }),
  getters: {
    getProject: (state) => state.selected,
    getTree: (state) => state.selected.data,
    anyBlockPicked: state => (state.blockOnCreate.component && state.blockOnCreate.icon),
    getAvailableBlocks: state => Object.keys(state.app.componentLibrary).map(el => ({
      name: el,
      title: state.app.componentLibrary[el].title,
    }))
  },
  actions: {
    async useById(id: number) {
      const ProjectModel = await import(
        '@/api/modules/project/models/project.model.ts'
      );
      const project = await ProjectModel.default.getOne(id);
      localStorage.setItem('selected-project', String(id));
      this.use(project.getData());
    },
    use(projectDto: any) {
      this.selected = projectDto;
    },
    setApp(app: any) {
      this.app = app;
    },
    async save(state = null) {
      const ProjectModel = await import(
        '@/api/modules/project/models/project.model.ts'
      );
      const packager = new Packager(this.app)
      const data = state ? state : {
        data: packager.json()
      }
      return await ProjectModel.default.update(this.selected.id, data);
    },
    async openNew() {
      const newProject = new CreateProjectDto(generateSlug(2), '{}', [], 1);
      const ProjectModel = await import(
        '@/api/modules/project/models/project.model.ts'
      );
      this.selected = (await ProjectModel.default.create(newProject)).getData();

      const initComponent = new Container();
      initComponent.setKeySalt(
        `${this.selected.id}${String(TokenUtil.getAuthorized().id)}`,
      );
      initComponent.generateKey();
      this.selected.data = JSON.stringify({
        [initComponent.key]: initComponent.toJson(),
      });

      localStorage.setItem('selected-project', this.selected.id);

      await this.save(this.selected);

      return this.selected;
    },
    pickBlock(block: { component: string, icon: HTMLElement }) {
      this.blockOnCreate = block;
    },
    clearBlockSelection() {
      if (this.blockOnCreate.icon)
        this.blockOnCreate.icon.remove()
      this.blockOnCreate = {
        icon: null,
        component: null
      }
    },
    placeBlock(parent: string) {
      if (!this.anyBlockPicked) return;
      this.app.add(this.blockOnCreate.component, "", parent);
      this.clearBlockSelection()
    }
  },
});

export default useEditorStore;
