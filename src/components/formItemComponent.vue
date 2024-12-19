<template>
  <div class="form-item">
    <p class="form-label">{{ name }}</p>
    <n-button @click="" color="#7b7bfe"> Просмотреть </n-button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'FormItemComponent',
  props: {
    name: '',
  },
};
</script>

<style>
.form-item {
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

.form-label {
  color: #6f6c99;
}
</style>