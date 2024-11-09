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
import useWidgetLibraryStore from '@/store/widget-library.store.ts';

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
      componentSetupStore: useComponentSetupStore(),
      widgetLibraryStore: useWidgetLibraryStore()
    }
  },
  data: () => ({
    app: App
  }),
  methods: {
    async selectComponent(comp: Component) {
      const result = await this.componentSetupStore.selectComponent(comp)
      if (result)
        result.toastIfError(this.notificationStore);
    },
    async removeComponent(comp: Component) {
      const removedItemParent = this.app.remove(comp.key)
      const result = (removedItemParent) ?
        (await this.componentSetupStore.patchTree(removedItemParent)) :
        (await this.editorStore.save())
      if (result)
        result.toastIfError(this.notificationStore);
    },
    async moveComponent(left: boolean) {
      const updated = this.app.move(this.editorStore.blockOnSetup, left)
      const result = (updated) ?
        (await this.componentSetupStore.patchTree(updated)) :
        (await this.editorStore.save())
      if (result)
        result.toastIfError(this.notificationStore);
    },
    async saveAsWidget() {
      let result = await this.componentSetupStore.saveWidget();
      if (result)
        result.toastIfError(this.notificationStore);
      result = await this.widgetLibraryStore.loadWidgets()
      if (result)
        result.toastIfError(this.notificationStore);
    },
    async placeBlock(picked, parent) {
      if (this.editorStore.anyBlockPicked) {
        picked.icon.remove()
        const added = this.editorStore.placeBlock(parent)
        const result = (parent) ? (await this.componentSetupStore.patchTree(added.parent)) : (await this.editorStore.save())
        if (result)
          result.toastIfError(this.notificationStore);
      }
    }
  },
  async mounted() {
    await this.editorStore.useById(Number(this.$route.params.id))
    const app: App = this.$mount_editor('app-builder', `${this.$route.params.id}${TokenUtil.getAuthorized().id}`, this.editorStore.getTree);
    await this.selectComponent(app.root[Object.keys(app.root)[0]])
    this.app = app
    
    document.body.addEventListener('click', () => {
      this.editorStore.contextMenu.autoClose = true
      this.editorStore.closeContext()
    })
    
    document.body.addEventListener('keydown', (ev) => {
      if (ev.code == 'Escape') {
        ev.preventDefault()
        this.editorStore.contextMenu.autoClose = true
        this.editorStore.closeContext()
        if (this.editorStore.blockOnCreate.icon) {
          this.editorStore.blockOnCreate.icon.remove()
        }
        this.editorStore.clearBlockSelection()
      }
    })
    
    document.getElementById(app.mountPoint).addEventListener('click', () => {
      this.placeBlock(this.editorStore.blockOnCreate, null)
    })
    
    app.subscribe('click', async (topPath: Component[], ev) => {
      if (this.editorStore.anyBlockPicked) {
        const pickedBlockClosure = ((picked: { component: string, icon: HTMLElement }) => async (selected: Component) => {
          await this.placeBlock(picked, selected.key)
        })(this.editorStore.blockOnCreate)
        
        this.editorStore.openContext(topPath, { x: ev.clientX, y: ev.clientY }, pickedBlockClosure)
      }
      else {
        this.editorStore.openContext(topPath, { x: ev.clientX, y: ev.clientY }, async (selected) => {
          await this.selectComponent(selected)
        })
      }
    })
    
    app.subscribe('contextmenu', (topPath: Component[], ev) => {
      console.log("open context")
      this.editorStore.openContext(topPath, { x: ev.clientX, y: ev.clientY }, async (selected) => {
        this.editorStore.openSetupContext(selected, async (value) => {
          this.editorStore.contextMenu.autoClose = true
          switch (value.val) {
            case 'edit':
              await this.selectComponent(selected)
              break;
            case 'remove':
              await this.removeComponent(selected)
              break;
            case 'save-widget':
              await this.saveAsWidget()
              break;
            case 'move-left':
              await this.moveComponent(true)
              break;
            case 'move-right':
              await this.moveComponent(false)
              break;
          }
        })
      }, false)
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
