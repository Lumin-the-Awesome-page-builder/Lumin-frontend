<script lang="ts">
export default {
  name: 'SearchBar',
  props: {
    searchValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      searchQuery: this.searchValue,
    };
  },
  methods: {
    onInput() {
      this.$emit('update:searchValue', this.searchQuery);
    },
  },
  watch: {
    searchValue(newValue) {
      this.searchQuery = newValue;
    },
  },
};

</script>

<template>
  <div class="search-bar">
    <div class="input-container">
      <img class="search-icon" src="../assets/imageSearch/search.svg" alt="search"/>
      <input v-model="searchQuery" @input="onInput" type="text"
        placeholder="Введите фразу для поиска..." class="search-input"/>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
  position: relative;
}

.input-container {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.625rem;
  left: 0.47rem;
}

.search-input {
  padding: 0.625rem 0.625rem 0.625rem 2.25rem;
  display: flex;
  width: 75rem;
  border: 0.0625rem solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-style: italic;
  box-sizing: border-box;
}

.search-input::placeholder {
  color: #aaa;
}
</style>