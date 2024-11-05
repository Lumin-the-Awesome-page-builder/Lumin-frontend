import { defineStore } from 'pinia';
import Component from '@/editor/core/component/Component.ts';
import LoggerUtil from '@/utils/logger/logger.util.ts'

const useComponentSetupStore = defineStore({
  id: 'component-setup-store',
  state: (): { component: Component | null } => ({
    component: null,
  }),
  actions: {
    selectComponent(component: Component) {
      if (this.component) {
        const updatePath = this.component.findTop().map((item) => item.key);
        const packed = JSON.stringify(component.toJson());
        LoggerUtil.debug(updatePath, packed);
      }
      this.component = component;
      LoggerUtil.debug(this.component);
    },
  },
});

export default useComponentSetupStore;
