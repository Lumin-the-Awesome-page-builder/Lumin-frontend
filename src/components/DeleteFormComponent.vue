<template>
  <div class="backgroundContainer">
    <div class="container">
      <div class="closePart">
        <img src="../assets/svg/close.svg" class="img"/>
      </div>
      <div class="inputs_container">
        <h2 class="container_title title">Подтвержение удаления</h2>
        <span class="block_title title">Вы уверены, что хотите удалить {{projectName}}?</span>
        <span class="block_title_bold title">Отменить это действие будет невозможно.</span>
        <n-button color="#FF356BA6" class="btn">Удалить</n-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "DeleteFormComponent",
  props: {
    projectName: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.backgroundContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.85);
  Backdrop-filter: blur(40px);
  z-index: 9;
}

.container {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 1.5rem;
  justify-content: center;
  align-items: center;
  width: 30vw;
  min-width: 500px;
  min-height: 250px;
  height: 20vh;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  z-index: 10;
}

.inputs_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90%;
}

.title {
  color: black;
  cursor: default;
}

.btn {
  width: 15rem;
  margin: 1.5rem;
}

.closePart {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 20%;
  left: 50%;
  width: 50px;
  min-height: 50px;
  max-height: 50px;
  height: 100%;
  border-radius: 50%;
  background-color: white;
}

.img {
  cursor: pointer;
}
</style>