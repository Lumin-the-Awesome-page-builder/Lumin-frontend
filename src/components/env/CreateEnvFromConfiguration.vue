<template>
  <div class="page-header">
    <h2 class="page-heading">Выбор конфигурации</h2>
  </div>
  <EnvConfigurationOption v-for="option in options"
    :id="option.id"
    :name="option.name"
  />
  <EnvConfigurationSetup v-if="anySelected" />
</template>

<script lang="ts">
import useCreateEnvStore from '@/store/create-env.store';
import EnvConfigurationOption from './EnvConfigurationOption.vue';
import EnvConfigurationSetup from './EnvConfigurationSetup.vue';

export default {
  name: "CreateEnvFromConfiguration",
  setup() {
    return {
      createEnvStore: useCreateEnvStore()
    }
  },
  components: {
    EnvConfigurationSetup, EnvConfigurationOption
  },
  methods: {
    changeSelected(optionId) {
      this.createEnvStore.selectedConf = optionId;
    }
  },
  computed: {
    options() {
      return this.createEnvStore.configurations
    },
    anySelected() {
      return this.createEnvStore.selectedConf != 0;
    }
  }
}
</script>