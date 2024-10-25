<template>
  <div class="backgroundContainer">
    <div class="container">
      <div class="logo">
        <img src="../assets/svg/Lumin_logo.svg" class="logo_svg">
      </div>
      <div class="inputs_container">
        <h2 class="container_title title">Добро пожаловать!</h2>
        <span class="block_title title">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce placerat, magna vel gravida pulvinar, purus nisl tempus mi, sed scelerisque lorem urna et lectus. Donec ac hendrerit odio, sed ullamcorper dui. In eget risus ligula. Morbi nec lacus varius, cursus ipsum ac, vestibulum nunc. Nulla bibendum semper diam, vel fringilla risus faucibus a. Vestibulum rhoncus nisl ac consequat bibendum. Suspendisse et convallis tellus. Etiam sit amet dictum neque.</span>
        <n-button color="#3535FFA6" class="btn">Продолжить</n-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "HelloFormComponent",
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
  min-height: 350px;
  height: 30vh;
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

.logo_svg {
  width: 8rem;
}
</style>