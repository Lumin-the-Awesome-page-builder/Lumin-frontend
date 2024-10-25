<template>
  <Workspace />
  <Controls />
</template>

<script lang="ts">
import Workspace from '@/components/Editor/Workspace.vue'
import Controls from '@/components/Editor/Controls.vue'

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
    this.$mount_editor('app-builder', String(123))
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
