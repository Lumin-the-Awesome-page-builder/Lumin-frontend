import { defineStore } from 'pinia';
import Component from '@/editor/core/component/Component.ts';
import PatchProjectTreeDto from '@/api/modules/project/dto/patch-project-tree.dto.ts';

const useComponentSetupStore = defineStore({
  id: 'component-setup-store',
  state: (): { component: Component | null } => ({
    component: null,
  }),
  actions: {
    async selectComponent(component: Component) {
      if (this.component) {
        const updatePath = this.component
          .findTop()
          .map((item) => item.key)
          .filter((el) => el != this.component.key);
        const packed = this.component.toJson();
        const projectModel = (
          await import('@/api/modules/project/models/project.model.ts')
        ).default;
        await projectModel.patchTree(
          parseInt(localStorage.getItem('selected-project')),
          new PatchProjectTreeDto(updatePath, packed),
        );
      }
      this.component = component;
    },
  },
});

export default useComponentSetupStore;
