<template>
  <h1 @click="test">{{ bobData }}</h1>
</template>

<script lang="ts">
import useCounterStore from '@/stores/counter';
import { defineComponent } from 'vue';


export default defineComponent({
  setup() {
    const counter = useCounterStore();
    
    return {
      counter
    }
  },
  data: () => ({
    bobData: "BOB"
  }),
  methods: {
    test() {
      this.counter.increment(1)
      this.bobData = `BOB${this.counter.doubleCount}`
    }
  }
})

</script>

<style scoped>

</style>