<template>
  <div>
    <h1>Демонстрация сортировки с Web Worker</h1>
    <BubbleSortDemo />
  </div>
</template>

<script>
import BubbleSortDemo from '../components/webworker/BubbleSortComponent.vue';

export default {
  name: "ParentComponent",
  components: {
    BubbleSortDemo,
  },
};
</script>

<style>

</style>