<template>
  <div class="env-item">
    <p class="env-item__title">{{ name }}</p>
    <p class="env-item__title">{{ status }}</p>
    <div class="bnt-control">
      <n-button @click="startContainer" color="#7b7bfe">
        <template #icon>
          <n-icon :component="Play" />
        </template>
        Запустить
      </n-button>
      <n-button @click="stopContainer" color="#7b7bfe">
        <template #icon>
          <n-icon :component="Stop" />
        </template>
        Остановить
      </n-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Play, Stop } from '@vicons/ionicons5';
import { shallowRef } from 'vue'
import { useEnvContainerListStore } from '@/store/envContainerListStore.ts';

export default {
  name: 'EnvContainerListItemComponent',
  props: {
    id: 0,
    name: '',
    status: '',
  },
  data: () => ({
    Play: shallowRef(Play),
    Stop: shallowRef(Stop),
    envContainerListStore: useEnvContainerListStore(),
  }),
  methods: {
    startContainer(ev) {
      ev.stopPropagation()
      this.envContainerListStore.startContainer(this.$route.params.envId, this.id)
    },
    stopContainer(ev) {
      ev.stopPropagation()
      this.envContainerListStore.stopContainer(this.$route.params.envId, this.id)
    }
  }
};
</script>

<style>
.env-item {
  width: 90%;
  height: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border: 0.1rem solid #b8b8c9;
  border-radius: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
}

.bnt-control {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.env-item__title {
  color: #6f6c99;
}
</style>