<script lang="ts">
export default {
  data() {
    return {
      environmentName: '',
      selectedConfig: []
    };
  },
  methods: {
    goBack() {
      window.history.back();
    },
    useReadyConfig() {
      console.log('Использовать готовую конфигурацию');
    },
    createNewConfig() {
      console.log('Создать новую конфигурацию');
    },
    saveEnvironment() {
      console.log('Сохранить окружение');
      console.log('Название окружения:', this.environmentName);
      console.log('Выбранная конфигурация:', this.selectedConfig);
    }
  }
};
</script>

<template>
  <div class="environment-creation">
    <h2 @click="goBack" class="clickable-title">
      <img src="../assets/imageConfiguration/back.svg" alt="назад" class="arrow-icon" />
      Создание окружения
    </h2>

    <input
      type="text"
      v-model="environmentName"
      placeholder="Введите название окружения"
      class="environment-input"
    />

    <div class="button-group">
      <button @click="useReadyConfig" class="button-primary">Использовать готовую конфигурацию</button>
      <button @click="createNewConfig" class="button-secondary">Создать новую конфигурацию</button>
      <button @click="saveEnvironment" class="button-primary">Сохранить окружение</button>
    </div>

    <h3>Выбор конфигурации</h3>
    <div class="config-options">
      <label class="config-option">
        <span>NodeJS + PostgreSQL</span>
        <input type="checkbox" v-model="selectedConfig" value="NodeJS + PostgreSQL" />
      </label>
      <label class="config-option">
        <span>Java + PostgreSQL</span>
        <input type="checkbox" v-model="selectedConfig" value="Java + PostgreSQL" />
      </label>
    </div>
  </div>
</template>

<style scoped>
.environment-creation {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.25rem;
  font-family: Arial, sans-serif;
}

.clickable-title {
  font-size: 1.5rem;
  color: #353547;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.arrow-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
}

.environment-input {
  width: 100%;
  padding: 0.625rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.3125rem;
  outline: none;
  margin-bottom: 1.25rem;
}

.environment-input::placeholder {
  font-style: italic;
}

.button-group {
  display: flex;
  gap: 0.625rem;
}

.button-primary,
.button-secondary {
  padding: 0.3125rem 0.9375rem;
  background-color: #ffffff;
  color: rgba(53, 53, 255, 0.65);
  border: 1px solid rgba(53, 53, 255, 0.65);
  border-radius: 0.3125rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.button-primary:hover,
.button-secondary:hover {
  background-color: rgba(53, 53, 255, 0.65);
  color: #ffffff;
}

h3 {
  text-align: left;
  color: #353547;
}

.config-options {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-top: 0.625rem;
  color: #353547;
  text-align: left;
}

.config-option {
  display: flex;
  align-items: center;
  padding: 0.625rem;
  border: 1px solid #ddd;
  border-radius: 0.3125rem;
  cursor: pointer;
  font-size: 1rem;
}

.config-option span {
  flex: 1;
}

.config-option input[type="checkbox"] {
  margin-left: auto;
}
</style>
