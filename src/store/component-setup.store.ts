import { defineStore } from 'pinia';
import Component from '@/editor/core/component/Component.ts';
import PatchProjectTreeDto from '@/api/modules/project/dto/patch-project-tree.dto.ts';
import html2canvas from 'html2canvas';
import CreateWidgetDto from '@/api/modules/widget/dto/create-widget.dto.ts';

const useComponentSetupStore = defineStore({
  id: 'component-setup-store',
  state: (): { component: Component | null } => ({
    component: null,
  }),
  actions: {
    async patchTree(component: Component) {
      const updatePath = component
        .findTop()
        .map((item) => item.key)
        .filter((el) => el != component.key);
      const packed = component.toJson();
      const projectModel = (
        await import('@/api/modules/project/models/project.model.ts')
      ).default;
      return await projectModel.patchTree(
        parseInt(localStorage.getItem('selected-project')),
        new PatchProjectTreeDto(updatePath.reverse(), packed),
      );
    },
    async generatePreview(component: Component) {
      const htmlComponent = component.pure
        ? component.specific.htmlOnRender
        : component.htmlElement;

      return await html2canvas(htmlComponent, {
        windowWidth: 500,
        windowHeight: 300,
        scale: 1,
      }).then((canvas) => {
        return canvas.toDataURL('image/png');
      });
    },
    async selectComponent(component: Component) {
      let result;
      if (this.component) {
        result = this.patchTree(this.component);
      }
      this.component = component;
      return result;
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
