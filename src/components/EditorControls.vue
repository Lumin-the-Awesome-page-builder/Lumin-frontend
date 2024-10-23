<template>
  <div class="editor-controls">
    {{ app?.state }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {App} from "@/editor/App";

export default defineComponent({
  name: 'HelloWorld',
  props: {
    app: App,
  },
});
</script>

<style scoped>
  .editor-controls {
    width: 15%;
  }
</style>
