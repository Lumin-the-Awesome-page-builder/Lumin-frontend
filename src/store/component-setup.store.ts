import { defineStore } from 'pinia';
import Component from '@/editor/core/component/Component.ts';
import LoggerUtil from '@/utils/logger/logger.util.ts'
import PatchProjectTreeDto from '@/api/modules/project/dto/patch-project-tree.dto.ts';

const useComponentSetupStore = defineStore({
  id: 'component-setup-store',
  state: (): { component: Component | null } => ({
    component: null,
  }),
  actions: {
    async selectComponent(path: Component[], index: number) {
      if (this.component) {
        const updatePath = this.component.findTop().map((item) => item.key);
        const packed = JSON.stringify(this.component.toJson());
        const projectModel = (await import('@/api/modules/project/models/project.model.ts')).default
        await projectModel.patchTree(
          localStorage.getItem("selected-project"),
          new PatchProjectTreeDto(updatePath, packed)
        );
      }
      this.component = path[index];
    },
  },
});

export default useComponentSetupStore;
