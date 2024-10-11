<template>
  <h1>{{ msg }}</h1>
  <button @click="tryThis"></button>
</template>

<script lang="ts">
export default {
  props: {
    count: Number
  },
  name: "HelloWorld",
  data: () => ({
    msg: "Hello!"
  }),
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
.read-the-docs {
  color: #888;
}
</style>
