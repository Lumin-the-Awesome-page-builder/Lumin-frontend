<template>
  <div class="env-option" @click="changeSelected">
    <span class="option-name">
        {{ name }}
    </span>

    <n-checkbox
      @update:checked="changeSelected"
      :checked="selected"
    />
  </div>
</template>
<script lang="ts">
import useCreateEnvStore from '@/store/create-env.store';

export default {
  name: "EnvConfigurationOption",
  props: {
    id: Number,
    name: String,
  },
  setup() {
    return {
      createEnvStore: useCreateEnvStore()
    }
  },
  data: () => ({

  }),
  computed: {
    selected() {
      return this.createEnvStore.selectedConf == this.id
    }
  },
  methods: {
    changeSelected() {
      this.createEnvStore.selectedConf = this.id
    }
  }
}
</script>
<style>
  .env-option {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
    border-radius: 1rem;
    border: 1px solid #c5c3e5;
    cursor: pointer;
  }
  .env-option > .option-name {
    font-size: 18px;
    font-weight: 600;
    color: #6f6c99; 
  }
</style>