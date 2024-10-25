<template>
  <div class="editor-controls">
    {{ app?.initState }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {App} from "@/editor/App.ts";

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
