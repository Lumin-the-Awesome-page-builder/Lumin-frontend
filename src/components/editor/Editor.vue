<template>
  <div class="editor-wrapper">
    <div class="editor-section">
      <Workspace />
    </div>
    <div class="editor-controls">
      <RSidebarComponent />
    </div>
  </div>
</template>

<script lang="ts">
import Workspace from '@/components/editor/Workspace.vue'
import useEditorStore from '@/store/editor.store.ts'
import TokenUtil from '@/utils/token.util.ts';
import useComponentSetupStore from '@/store/component-setup.store.ts';
import Component from '@/editor/core/component/Component.ts';
import RSidebarComponent from '@/components/editor/RSidebarComponent.vue';

export default {
  components: {
    Workspace, RSidebarComponent
  },
  name: "Editor",
  setup() {
    return {
      editorStore: useEditorStore(),
      componentSetupStore: useComponentSetupStore()
    }
  },
  async mounted() {
    await this.editorStore.useById(Number(this.$route.params.id))
    const app = this.$mount_editor('app-builder', `${this.$route.params.id}${TokenUtil.getAuthorized().id}`, this.editorStore.getTree)
    await this.componentSetupStore.selectComponent(app.root, Object.keys(app.root)[0])
    app.subscribe('click', async (topPath: Component[]) => {
      if (this.editorStore.anyBlockPicked)
        this.editorStore.placeBlock(topPath[topPath.length - 1].key)
      else {
        await this.componentSetupStore.selectComponent(topPath, 0)
      }
    })

    this.editorStore.setApp(app)
  }
}
</script>
<style src="@/assets/picked-up-component.css"></style>
<style scoped>
.editor-controls {
  height: 100vh;
  overflow-y: auto;
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
