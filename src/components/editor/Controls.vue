<template>
  <div class="editor-controls">
    <button @click="download">Download</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {App} from "@/editor/App.ts";
import Packager from '@/editor/core/Packager.ts';

export default defineComponent({
  name: 'Controls',
  props: {
    app: App,
  },
  methods: {
    download() {
      const packager = new Packager(this.app)
      packager.json()
      
      const blob = packager.blob()
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'index.html';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
});
</script>

<style scoped>
  .editor-controls {
    width: 15%;
  }
</style>
