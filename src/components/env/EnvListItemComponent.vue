<template>
  <div class="content">
    <p class="nameText"> {{name}} </p>
    <n-button  color="#3535FFA6" class="btn">Редактировать</n-button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'EnvListItemComponent',
  props: {
    name: ""
  }
}
</script>

<style>
.content {
  width: 90%;
  height: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 2rem;
  padding-right: 2rem;
  align-items: center;
  border: 0.1rem solid #b8b8c9;
  border-radius: 1rem;
}

.nameText {
  color: #6f6c99;
}
</style>