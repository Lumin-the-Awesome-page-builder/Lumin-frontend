<template>
  <n-notification-provider>
    <div class="editor-wrapper">
      <div class="editor-section">
        <Workspace />
      </div>
      <div class="editor-contolls">
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

export default {
  components: {
    Workspace
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
      console.log(topPath)
      await this.componentSetupStore.selectComponent(topPath, topPath.length - 1)
    })

    this.editorStore.setApp(app)
  },
  methods: {
  }
}
</script>

<style scoped>
.editor-wrapper {
  display: flex;
  width: 100%;
}
.editor-section {
  width: 100%;
  max-width: 80vw;
}
</style>
