import { defineStore } from 'pinia';
import Component from '@/editor/core/component/Component.ts';
import html2canvas from 'html2canvas';
import CreateWidgetDto from '@/api/modules/widget/dto/create-widget.dto.ts';
import ProjectWsModel from '@/api/modules/project/models/project-ws.model';

const useComponentSetupStore = defineStore({
  id: 'component-setup-store',
  state: (): { component: Component | null; ws: ProjectWsModel } => ({
    component: null,
    ws: new ProjectWsModel(0, ''),
  }),
  actions: {
    setWs(ws: ProjectWsModel) {
      this.ws = ws;
    },
    async patchTree(component: Component) {
      // console.log()
      return await this.ws.patchElement(component);
    },
    async removeComponent(path: string[]) {
      return await this.ws.removeElement(path);
    },
    async patchOrdering(path: string[], ordering: string[]) {
      return await this.ws.patchElementOrdering(path, ordering);
    },
    async patchProp(name: string, value: any, component: Component) {
      return await this.ws.replaceProp(component, name, value);
    },
    async generatePreview(component: Component) {
      return await html2canvas(component.getHTML(), {
        windowWidth: 500,
        windowHeight: 300,
        scale: 1,
      }).then((canvas) => {
        return canvas.toDataURL('image/png');
      });
    },
    async selectComponent(component: Component) {
      if (this.component) {
        this.component.removeSelected();
        this.ws.releaseComponent(this.component);
        if (this.component.key !== component.key) {
          this.component = component;
          this.ws.blockComponent(component);
          console.log(this.component);
          this.component.setSelected();
        } else {
          this.component = null;
        }
      } else {
        this.component = component;
        this.ws.blockComponent(component);
        console.log(this.component);
        this.component.setSelected();
      }
    },
    async saveWidget(component: Component | null = null) {
      const componentName = component
        ? component.userName
        : this.component.userName;
      const componentJson = component
        ? component.toJson()
        : this.component.toJson();
      const dataUrl = component
        ? (await this.generatePreview(component)).split('base64,')[1]
        : (await this.generatePreview(this.component)).split('base64,')[1];

      const widgetModel = (
        await import('@/api/modules/widget/models/widget.model.ts')
      ).default;

      return await widgetModel.create(
        new CreateWidgetDto(
          componentName,
          JSON.stringify(componentJson),
          [],
          1,
          dataUrl,
        ),
      );
    },
  },
});

export default useComponentSetupStore;
