import { defineStore } from 'pinia';
import { App } from '@/editor/App.ts';
import CreateProjectDto from '@/api/modules/project/dto/create-project.dto.ts';
import { generateSlug } from 'random-word-slugs';
import Container from '@/editor/components/Container.ts';
import TokenUtil from '@/utils/token.util.ts';
import Component from '@/editor/core/component/Component.ts';
import html2canvas from 'html2canvas';
import ProjectWsModel from '@/api/modules/project/models/project-ws.model';
import { getEditorInstance } from '@/editor/plugin';
import FormsModel from '@/api/modules/forms/forms.model';
import Attribute from '@/editor/core/attribute/Attribute';
import appConf from '@/api/conf/app.conf';

const useEditorStore = defineStore({
  id: 'editor-store',
  state: () => ({
    ws: new ProjectWsModel(0, ''),
    //@ts-ignore
    selected: null,
    app: new App(),
    blockOnCreate: {
      widget: false,
      icon: null,
      component: null,
    },
    onMoveFrom: null,
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
    async init(id: number) {
      const ProjectModel = await import(
        '@/api/modules/project/models/project.model.ts'
      );
      const startEditDto = await ProjectModel.default.startEditing(id);

      if (!startEditDto.success) return startEditDto;

      const project = startEditDto.getData().project;
      project.data = startEditDto.getData().tree;

      localStorage.setItem('selected-project', String(project.id));
      this.use(project);

      return startEditDto;
    },
    use(projectDto: any) {
      this.selected = projectDto;
    },
    setApp(app: any) {
      this.app = app;
    },
    setWs(ws: ProjectWsModel) {
      this.ws = ws;
    },
    async save() {
      return await this.ws.save();
    },
    async saveForms() {
      const forms = [];
      this.app.scanForForms(this.app.root, forms);
      const formsModel = new FormsModel();
      await Promise.all(
        forms.map(async (el) => {
          if (el.id) {
            const res = el.save_url
              ? await formsModel.updateForm(this.selected.id, el)
              : await formsModel.updateFormServiceBased(this.selected.id, el);

            el.component.specific.id = res.getData().id;
          } else {
            const res = el.save_url
              ? await formsModel.saveForm(this.selected.id, el)
              : await formsModel.saveFormServiceBased(this.selected.id, el);
            el.component.specific.id = res.getData().id;
          }
          const saveUrl = el.save_url
            ? el.save_url
            : `${appConf.proto}://${appConf.endpoint}/lumin/form/form-handler/${el.id}/data`;
          el.component.attributes.add(new Attribute(`data-form`, el.id));
          el.component.htmlElement.setAttribute(`data-form`, el.id);
          el.component.attributes.add(new Attribute(`data-form-url`, saveUrl));
          el.component.htmlElement.setAttribute(`data-form-url`, saveUrl);
        }),
      );
      return forms;
    },
    async updateDeployment() {
      if (this.selected.domain_name) {

      }
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
      const editor = getEditorInstance();
      const props = editor.buildProps(initComponent, []);
      initComponent.setProps(props);
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

      const saveRes = await ProjectModel.default.update(this.selected.id, {
        name: newProject.name,
        data: this.selected.data,
        tags: [],
        category: newProject.category_id,
      });

      return saveRes;
    },
    pickBlock(
      block: { component: string; icon: string; widget: boolean },
      title: string,
    ) {
      const div = document.createElement('div');
      div.id = 'picked';
      div.classList.add('picked-up-block');

      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      const preview = document.createElement('img');
      preview.classList.add('overlay-img');
      preview.src = block.icon;
      overlay.appendChild(preview);

      const span = document.createElement('span');
      span.innerText = title;

      div.appendChild(overlay);
      div.appendChild(span);
      document.body.appendChild(div);

      const picked = document.getElementById('picked');
      document.addEventListener('mousemove', (ev) => {
        picked.style = `top: 0; left: 0; transform: translate(${ev.clientX + 40}px, ${ev.clientY + 40}px)`;
      });

      this.blockOnCreate = { ...block, icon: picked };
    },
    clearBlockSelection() {
      if (this.blockOnCreate.icon) this.blockOnCreate.icon.remove();

      if (this.onMoveFrom) {
        const oldParent =
          this.onMoveFrom != 'last'
            ? this.app.state[this.onMoveFrom].parent
            : null;
        this.placeBlock(oldParent ? oldParent.key : null, this.onMoveFrom);
        this.onMoveFrom = null;
      }

      this.blockOnCreate = {
        widget: false,
        icon: null,
        component: null,
      };
    },
    placeBlock(parent: string, placeBefore: string | null = null) {
      if (!this.anyBlockPicked) return;

      if (this.onMoveFrom) this.onMoveFrom = null;

      let added;
      if (this.blockOnCreate.widget)
        added = this.app.addWidget(
          this.blockOnCreate.component,
          parent,
          placeBefore,
        );
      else
        added = this.app.add(this.blockOnCreate.component, parent, placeBefore);
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
            userName: 'Переместить',
            val: 'move',
          },
          {
            key: 3,
            userName: 'Редактировать',
            val: 'edit',
          },
          {
            key: 4,
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
