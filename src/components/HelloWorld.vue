<template>
  <Editor />
  <EditorControls />
</template>

<script lang="ts">
import Editor from '@/components/Editor.vue'
import EditorControls from '@/components/EditorControls.vue'
import mount from "@/editor/mount";

export default {
  props: {
    count: Number
  },
  components: {
    EditorControls, Editor
  },
  name: "HelloWorld",
  data: () => ({
    msg: "Hello!"
  }),
  mounted() {
    mount('app-builder', String(123))
  },
  methods: {
    tryThis() {
      if (this.count % 2 == 0) {
        this.$router.push("/about")
      }
      this.msg = "You are banned!"
    }
  }
}
</script>

<style scoped>
</style>
