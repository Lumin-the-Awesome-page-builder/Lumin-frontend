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
import ProjectWsModel from '@/api/modules/project/models/project-ws.model';

export default defineComponent<any>({
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
      const path = comp.findTop().map(el => el.key).reverse();
      // this.app.remove(comp.key)
      const result = await this.componentSetupStore.removeComponent(path)
      if (result)
        result.toastIfError(this.notificationStore);
      
      return comp
    },
    async moveComponentInParent(left: boolean) {
      const updated = this.app.move(this.editorStore.blockOnSetup, left)
      const result = await this.componentSetupStore.patchOrdering(
        updated.findTop().map(el => el.key).reverse(), 
        updated.childrenOrdering
      )
      if (result)
        result.toastIfError(this.notificationStore);
    },
    async moveComponent(component: Component) {
      const previewImage = await this.componentSetupStore.generatePreview(component)
      const siblings = component.parent ? component.parent.childrenOrdering : this.app.rootOrdering;
      const nextSibling = siblings.indexOf(component.key) + 1
      
      this.editorStore.onMoveFrom = nextSibling < siblings.length ? siblings[nextSibling] : 'last'
      
      await this.removeComponent(component)
      this.editorStore.pickBlock({ component: JSON.stringify(component.toJson()), icon: previewImage, widget: true }, component.getTitle())
    },
    async saveAsWidget(component: Component) {
      let result = await this.componentSetupStore.saveWidget(component);
      if (result)
        result.toastIfError(this.notificationStore);
      result = await this.widgetLibraryStore.loadWidgets()
      if (result)
        result.toastIfError(this.notificationStore);
    },
    async placeBlock(picked: { icon: { remove: () => void; }; }, parent: any) {
      if (this.editorStore.anyBlockPicked) {
        picked.icon.remove()
        const added = this.editorStore.placeBlock(parent);
        const result = await this.componentSetupStore.patchTree(added);
        if (result)
          result.toastIfError(this.notificationStore);
      }
    }
  },
  async mounted() {
    // this.$route.params.id could be ID of project or access-token from collaboration link
    const initRes = await this.editorStore.init(this.$route.params.id)
    
    if (!initRes.success) {
      // showNotification
      // and redirect to home
    }
    const project = initRes.getData().project;

    const ws: ProjectWsModel = new ProjectWsModel(project.id, initRes.getData().access);

    ws.register("patch", (data) => {
      const json = data.data.json
      const key = data.data.key
      const parentKey = data.data.parent_key
      this.app.addOrReplace(json, parentKey, key)
      console.log("new patch event", data)
    })
    ws.register("remove-element", (data) => {
      this.app.remove(data.data);
    })
    ws.register("block", (data) => {
      console.log("block")
      const path = data.data;
      this.app.applyByPath(path, (component) => { component.locked = true });
    })
    ws.register("release", (data) => {
      const path = data.data;
      this.app.applyByPath(path, (component) => { component.locked = false });
    })
    // ws.register("patch-prop-add", (data) => {
    //   console.log("new patch prop add event", data)
    // })
    // ws.register("patch-prop-remove", (data) => {
    //   console.log("new patch prop remove event", data)
    // })
    ws.register("patch-prop-replace", (data) => {
      const propName = data.prop_name
      const propValue = data.prop_value
      const key = data.key;
      propValue.forEach((val, index) => {
        this.app.state[key].props.get(propName).setValue(val, index)
      })
    })
    ws.register("patch-item-ordering", (data) => {
      this.app.state[data.path].childrenOrdering = data.ordering;
      this.app.state[data.path].render();
    })
    ws.registerOnError((err) => {
      console.log("ws error: ", err)
    })

    ws.registerOnClose((err) => {
      console.log("ws close: ", err.reason)
    })

    await ws.init();
    ws.auth();

    this.editorStore.setWs(ws)
    this.componentSetupStore.setWs(ws)

    const app: App = this.$mount_editor('app-builder', `${project.id}${TokenUtil.getAuthorized().id}`, this.editorStore.getTree);
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
        this.editorStore.clearBlockSelection()
      }
    })
    
    document.getElementById(app.mountPoint).addEventListener('click', () => {
      this.placeBlock(this.editorStore.blockOnCreate, null)
    })
    
    app.subscribe('click', async (topPath: Component[], ev: { clientX: any; clientY: any; }) => {
      if (this.editorStore.anyBlockPicked) {
        const pickedBlockClosure = ((picked: { component: string, icon: HTMLElement }) => async (selected: Component) => {
          await this.placeBlock(picked, selected.key)
        })(this.editorStore.blockOnCreate)
        
        this.editorStore.openContext(topPath, { x: ev.clientX, y: ev.clientY }, pickedBlockClosure)
      }
      else {
        console.log(topPath)
        if (topPath.length == 1) {
          await this.selectComponent(topPath[0])
        } else {
          this.editorStore.openContext(topPath, { x: ev.clientX, y: ev.clientY }, async (selected: any) => {
            await this.selectComponent(selected)
          })
        }
      }
    })
    
    app.subscribe('contextmenu', (topPath: Component[], ev: { clientX: any; clientY: any; }) => {
      console.log("open context")
      this.editorStore.openContext(topPath, { x: ev.clientX, y: ev.clientY }, async (selected: Component) => {
        this.editorStore.openSetupContext(selected, async (value: { val: any; }) => {
          switch (value.val) {
            case 'edit':
              this.editorStore.contextMenu.autoClose = true
              await this.selectComponent(selected)
              break;
            case 'remove':
              this.editorStore.contextMenu.autoClose = true
              await this.removeComponent(selected)
              break;
            case 'move':
              this.editorStore.contextMenu.autoClose = true
              await this.moveComponent(selected)
              break;
            case 'save-widget':
              this.editorStore.contextMenu.autoClose = true
              await this.saveAsWidget(selected)
              break;
            case 'move-left':
              await this.moveComponentInParent(true)
              break;
            case 'move-right':
              await this.moveComponentInParent(false)
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
