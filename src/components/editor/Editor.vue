<template>
  <Workspace />
  <Controls />
</template>

<script lang="ts">
import Workspace from '@/components/editor/Workspace.vue'
import Controls from '@/components/editor/Controls.vue'

export default {
  props: {
    count: Number,
    initialTree: String,
  },
  components: {
    Controls, Workspace
  },
  name: "HelloWorld",
  data: () => ({
    msg: "Hello!"
  }),
  mounted() {
    this.$mount_editor('app-builder', String(123), this.initialTree)
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
