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
    async selectComponent(component: Component) {
      let result;
      if (this.component) {
        result = this.patchTree(this.component);
      }
      this.component = component;
      return result;
    },
    async saveWidget() {
      const htmlComponent = this.component.pure
        ? this.component.specific.htmlOnRender
        : this.component.htmlElement;

      const dataUrl = (
        await html2canvas(htmlComponent, {
          windowWidth: 500,
          windowHeight: 300,
          scale: 1,
        }).then((canvas) => {
          return canvas.toDataURL('image/png');
        })
      ).split('base64,')[1];

      const widgetModel = (
        await import('@/api/modules/widget/models/widget.model.ts')
      ).default;

      return await widgetModel.create(
        new CreateWidgetDto(
          this.component.userName,
          JSON.stringify(this.component.toJson()),
          [],
          1,
          dataUrl,
        ),
      );
    },
  },
});

export default useComponentSetupStore;
