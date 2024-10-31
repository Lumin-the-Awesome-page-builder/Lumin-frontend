<template>
  <div class="wrapperControls">
    <n-collapse>
      <n-collapse-item title="right" name="1">
        <div>good</div>
      </n-collapse-item>
      <n-collapse-item title="right" name="2">
        <div>nice</div>
      </n-collapse-item>
      <n-collapse-item title="right" name="3">
        <div>very good</div>
      </n-collapse-item>
    </n-collapse>
  </div>
<!--  <div class="editor-controls">-->
<!--    <button @click="download">Download</button>-->
<!--  </div>-->
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

  .wrapperControls {
    width: 30vw;
    height: 90vh;
    background-color: #0a53be;

  }
</style>
