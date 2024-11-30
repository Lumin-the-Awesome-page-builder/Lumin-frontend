<template>
  <div class="btn">
    <n-button id="example-id" @click="fetchData">Fetch Data</n-button>
  </div>
  <div class="data" v-if="data">
    <h3>Products:</h3>
    <ul>
      <li v-for="item in data.products" :key="item.id">
        {{ item.title }} — {{ item.price }} $
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ExampleComponent",
  setup() {
    const data = ref<any | null>(null);
    const error = ref<Error | null>(null);
    let controller: AbortController | null = null;

    const fetchData = async () => {
      if (controller) {
        controller.abort();
      }

      controller = new AbortController();
      const signal = controller.signal;

      try {
        const response = await fetch('https://dummyjson.com/products/?delay=2000&limit=3', {
          method: 'GET',
          signal,
        });
        if (!response.ok) {
          console.log('Error');
        }
        data.value = await response.json();
        console.log(data.value)
      } catch (err) {
        error.value = err as Error;
      }
    };

    onMounted(() => {
      fetchData();
    });

    onBeforeUnmount(() => {
      if (controller) controller.abort();
    });

    return {
      data,
      error,
      fetchData,
    };
  },
});
</script>

<style scoped>
#example-id {
  display: grid;
  place-items: center;
}
.data {
  display: flex;
  padding: 5%;
  justify-content: space-evenly;
  align-self: center;
}
.btn {
  display: flex;
  justify-content: space-evenly;
  align-self: center;
  padding-top: 25px;
}
</style>