<template>
  <div id="app-builder">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  mounted() {
  }
});
</script>

<style scoped src="@/assets/bootstrap.css" />
<style scoped src="@/assets/editor.css" />
<style scoped>
  #app-builder {
    zoom: 1.5
  }
</style>
