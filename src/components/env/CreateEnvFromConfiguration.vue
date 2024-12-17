<template>
  <div class="page-header">
    <h2 class="page-heading">Выбор конфигурации</h2>
  </div>
  <EnvConfigurationOption v-for="option in options"
    :name="option.name"
    @change-selected="changeSelected(option.id)"
  />
</template>

<script lang="ts">
import EnvConfigurationOption from './EnvConfigurationOption.vue';

export default {
  name: "CreateEnvFromConfiguration",
  methods: {
    changeSelected(optionId) {
      console.log(optionId);
    }
  },
  computed: {
    options() {
      return [
        { id: 1, name: "Java + PostgreSQL" },
        { id: 2, name: "Node.js + PostgreSQL" },
      ]
    }
  }
}
</script>