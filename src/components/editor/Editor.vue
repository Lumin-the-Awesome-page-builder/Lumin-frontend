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

export default {
  components: {
    Workspace
  },
  name: "Editor",
  setup() {
    return {
      editorStore: useEditorStore()
    }
  },
  mounted() {
    console.log(this.editorStore.selected)
    const app = this.$mount_editor('app-builder', String(123), this.editorStore.getTree)
    app.subscribe('click', () => {
      console.log('event')
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
