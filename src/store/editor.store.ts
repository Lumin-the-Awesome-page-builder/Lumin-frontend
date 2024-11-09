import { defineStore } from 'pinia';
import { App } from '@/editor/App.ts';
import CreateProjectDto from '@/api/modules/project/dto/create-project.dto.ts';
import { generateSlug } from 'random-word-slugs';
import Container from '@/editor/components/Container.ts';
import TokenUtil from '@/utils/token.util.ts';
import Packager from '@/editor/core/Packager.ts';
import Component from '@/editor/core/component/Component.ts';
import html2canvas from 'html2canvas';

const useEditorStore = defineStore({
  id: 'editor-store',
  state: () => ({
    //@ts-ignore
    selected: null,
    app: new App(),
    blockOnCreate: {
      widget: false,
      icon: null,
      component: null,
    },
    blockOnSetup: null,
    contextMenu: {
      active: false,
      items: [],
      position: {
        x: 0,
        y: 0,
      },
      handler: (item) => {
        console.log(item);
      },
    },
  }),
  getters: {
    getProject: (state) => state.selected,
    getTree: (state) => state.selected.data,
    anyBlockPicked: (state) =>
      state.blockOnCreate.component && state.blockOnCreate.icon,
    getAvailableBlocks: (state) =>
      Object.keys(state.app.componentLibrary).map((el) => ({
        name: el,
        title: state.app.componentLibrary[el].title,
      })),
    getContextMenuItems: (state) => state.contextMenu.items,
  },
  actions: {
    async useById(id: number) {
      const ProjectModel = await import(
        '@/api/modules/project/models/project.model.ts'
      );
      const project = await ProjectModel.default.getOne(id);
      localStorage.setItem('selected-project', String(id));
      this.use(project.getData());
      return project;
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
      const packager = new Packager(this.app);
      const data = state
        ? state
        : {
            data: packager.json(),
          };
      return await ProjectModel.default.update(this.selected.id, data);
    },
    async updatePreview() {
      this.app.rootHTML.innerHTML = '';

      this.app.rootOrdering.forEach((el) => {
        this.app.rootHTML.appendChild(this.app.root[el].render(true));
      });

      const dataUrl = (
        await html2canvas(this.app.rootHTML, {
          width: 900,
          height: 600,
          windowWidth: 1700,
          windowHeight: 300,
          scale: 1,
          backgroundColor: '#f4f4f4',
          onclone: (document, r) => {
            r.style = 'width: 100%';
            r.parentNode.style =
              'width: 900px; display: flex; flex-direction: row; justify-content: center;';
            return this.app.rootHTML;
          },
        }).then((canvas) => {
          return canvas.toDataURL('image/png');
        })
      ).split('base64,')[1];

      const ProjectModel = await import(
        '@/api/modules/project/models/project.model.ts'
      );
      return ProjectModel.default.patchPreview(this.selected.id, dataUrl);
    },
    async openNew() {
      const newProject = new CreateProjectDto(generateSlug(2), '{}', [], 1);
      const ProjectModel = await import(
        '@/api/modules/project/models/project.model.ts'
      );
      const result = await ProjectModel.default.create(newProject);

      if (!result.success) {
        return result;
      }

      this.selected = result.getData();

      const initComponent = new Container();
      initComponent.setKeySalt(
        `${this.selected.id}${String(TokenUtil.getAuthorized().id)}`,
      );
      initComponent.generateKey();
      this.selected.data = JSON.stringify({
        setup: {
          rootOrdering: [initComponent.key],
        },
        [initComponent.key]: initComponent.toJson(),
      });

      localStorage.setItem('selected-project', this.selected.id);

      return await this.save(this.selected);
    },
    pickBlock(block: {
      component: string;
      icon: HTMLElement;
      widget: boolean;
    }) {
      this.blockOnCreate = block;
    },
    clearBlockSelection() {
      if (this.blockOnCreate.icon) this.blockOnCreate.icon.remove();
      this.blockOnCreate = {
        widget: false,
        icon: null,
        component: null,
      };
    },
    placeBlock(parent: string) {
      if (!this.anyBlockPicked) return;

      let added;
      if (this.blockOnCreate.widget)
        added = this.app.addWidget(this.blockOnCreate.component, parent);
      else added = this.app.add(this.blockOnCreate.component, parent);
      this.clearBlockSelection();

      return added;
    },
    openSetupContext(selected: Component, handler) {
      console.log('Setup open');
      this.blockOnSetup = selected;
      this.openContext(
        [
          {
            key: 1,
            userName: 'Удалить',
            val: 'remove',
          },
          {
            key: 2,
            userName: 'Редактировать',
            val: 'edit',
          },
          {
            key: 3,
            userName: 'Сохранить виджет',
            val: 'save-widget',
          },
        ],
        this.contextMenu.position,
        handler,
        false,
      );
    },
    openContext(items: any[], position, handler, autoClose = true) {
      this.contextMenu.autoClose = autoClose;
      this.contextMenu.active = true;
      this.contextMenu.items = items;
      this.contextMenu.handler = handler;
      this.contextMenu.position = position;
    },
    triggerContextItem(item: Component) {
      this.contextMenu.handler(item);
      this.closeContext();
    },
    closeContext() {
      if (!this.contextMenu.autoClose) return;
      this.contextMenu.items = [];
      this.contextMenu.position = { x: 0, y: 0 };
      this.contextMenu.handler = (_) => {
        console.log(_);
      };
      this.contextMenu.active = false;
      this.blockOnSetup = null;
      return this.contextMenu.autoClose;
    },
  },
});

export default useEditorStore;
