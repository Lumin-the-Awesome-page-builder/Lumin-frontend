<template>
  <n-notification-provider>
    <div class="editor-wrapper">
      <ContextMenuComponent />
      <div class="editor-section">
        <Workspace />
      </div>
      <div class="editor-controls">
        <RSidebarComponent />
      </div>
    </div>
  </n-notification-provider>
</template>

<script lang="ts">
import Workspace from '@/components/editor/Workspace.vue'
import useEditorStore from '@/store/editor.store.ts'
import TokenUtil from '@/utils/token.util.ts';
import useComponentSetupStore from '@/store/component-setup.store.ts';
import Component from '@/editor/core/component/Component.ts';
import RSidebarComponent from '@/components/editor/RSidebarComponent.vue';
import ContextMenuComponent from '@/components/editor/ContextMenuComponent.vue';
import { App } from '@/editor/App.ts';
import { useNotification } from 'naive-ui';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    ContextMenuComponent,
    Workspace, RSidebarComponent
  },
  name: "Editor",
  setup() {
    return {
      notificationStore: useNotification(),
      editorStore: useEditorStore(),
      componentSetupStore: useComponentSetupStore()
    }
  },
  async mounted() {
    await this.editorStore.useById(Number(this.$route.params.id))
    const app: App = this.$mount_editor('app-builder', `${this.$route.params.id}${TokenUtil.getAuthorized().id}`, this.editorStore.getTree);
    const result = await this.componentSetupStore.selectComponent(app.root[Object.keys(app.root)[0]])

    if (result)
      result.toastIfError(this.notificationStore);
    
    app.subscribe('click', async (topPath: Component[], ev) => {
      
      if (this.editorStore.anyBlockPicked) {
        const pickedBlockClosure = ((picked: { component: string, icon: HTMLElement }) => (selected: Component) => {
          picked.icon.remove()
          this.editorStore.clearBlockSelection()
          app.add(picked.component, "", selected.key)
        })(this.editorStore.blockOnCreate)
        
        this.editorStore.openContext(topPath, { x: ev.clientX, y: ev.clientY }, pickedBlockClosure)
      }
      else {
        this.editorStore.openContext(topPath, { x: ev.clientX, y: ev.clientY }, async (selected) => {
          const result = await this.componentSetupStore.selectComponent(selected)
          if (result)
            result.toastIfError(this.notificationStore);
        })
      }
      
    })

    this.editorStore.setApp(app)
  },
})
</script>
<style src="@/assets/editor-system-styles.css"></style>
<style scoped>
.editor-controls {
  height: 100vh;
  overflow-y: auto;
  padding-right: 5rem;
}
.editor-section {
  height: 100vh;
  overflow-y: auto;
}
.editor-wrapper {
  display: flex;
  width: 100%;
}
.editor-section {
  width: 100%;
  max-width: 80vw;
}
</style>
