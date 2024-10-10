
<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<style scoped>

</style>
