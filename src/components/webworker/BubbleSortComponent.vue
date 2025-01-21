<template>
  <div>
    <h2>Сортировка пузырьком</h2>
    <button @click="startSortingWorker" :disabled="sortingWorker">Сортировать с Web Worker</button>
    <button @click="startSortingMainThread" :disabled="sortingMainThread">Сортировать в основном потоке</button>
    <p v-if="sortingWorker">Сортировка с Worker...</p>
    <p v-if="sortingMainThread">Сортировка в основном потоке...</p>
    <p v-if="workerResult">Worker: Сортировка заняла {{ workerResult.time }} мс</p>
    <p v-if="mainThreadResult">Main Thread: Сортировка заняла {{ mainThreadResult.time }} мс</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      array: [],
      sortingWorker: false,
      sortingMainThread: false,
      workerResult: null,
      mainThreadResult: null,
      worker: null,
    };
  },
  mounted() {
    this.worker = new Worker(new URL('workers/bubbleSortWorker.js', import.meta.url));
    this.worker.onmessage = (e) => {
      this.workerResult = e.data;
      this.sortingWorker = false;
    };
  },
  beforeUnmount() {
    this.worker.terminate();
  },
  methods: {
    generateArray(size) {
      return Array.from({ length: size }, () => Math.floor(Math.random() * 50000));
    },
    startSortingWorker() {
      this.array = this.generateArray(50000);
      this.sortingWorker = true;
      this.workerResult = null;
      this.worker.postMessage([...this.array]);
    },
    startSortingMainThread() {
      this.array = this.generateArray(60000);
      this.sortingMainThread = true;
      this.mainThreadResult = null;

      const start = performance.now();
      const sortedArray = this.bubbleSort([...this.array]);
      const end = performance.now();

      this.mainThreadResult = { sortedArray, time: (end - start).toFixed(2) };
      this.sortingMainThread = false;
    },
    bubbleSort(arr) {
      let len = arr.length;
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          }
        }
      }
      return arr;
    },

  },
};
</script>

<style>
div {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 20px;
}

h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

p {
  font-size: 16px;
  color: #555;
  margin: 10px 0;
}

p:nth-of-type(1),
p:nth-of-type(2) {
  font-style: italic;
  color: #888;
}

p:nth-of-type(3),
p:nth-of-type(4) {
  font-weight: bold;
  color: #333;
}

</style>