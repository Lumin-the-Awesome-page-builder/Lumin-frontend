<template>
  <div class="editor-wrapper">
    <div class="editor-section">
      <Workspace />
    </div>
    <div class="editor-contolls">
      <RSidebarComponent />
    </div>
  </div>
</template>

<script lang="ts">
import Workspace from '@/components/editor/Workspace.vue'
import useEditorStore from '@/store/editor.store.ts'
import TokenUtil from '@/utils/token.util.ts';

export default {
  components: {
    Workspace
  },
  name: "Editor",
  setup() {
    return {
      editorStore: useEditorStore(),
    }
  },
  async mounted() {
    await this.editorStore.useById(Number(this.$route.params.id))
    console.log(this.editorStore.getTree)
    const app = this.$mount_editor('app-builder', `${this.$route.params.id}${TokenUtil.getAuthorized().id}`, this.editorStore.getTree)
    app.subscribe('click', (topPath) => {
      console.log(topPath)
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
