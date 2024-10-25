<template>
  <div class="container">
    <div class="logo">
      <img src="../assets/svg/Lumin_logo.svg" class="logo_svg">
    </div>
    <div class="inputs_container">
      <h2 class="container_title title">Подтверждение</h2>
      <n-p class="user_title title">Только для нового пользователя</n-p>
      <span class="block_title title">На вашу почту было отправлено письмо с кодом подтверждения.</span>
      <span class="block_title title">Введите его ниже:</span>
      <n-input  v-model="emailData" placeholder="123-456-789" type="text" class="input">
        <template #prefix>
          <img src="../assets/svg/email.svg" class="imgLogin"/>
        </template>
      </n-input>
      <n-button color="#3535FFA6" class="btn">Войти</n-button>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: "ConfirmationFormComponent",
  data() {
    return {
      emailData: {
        default: "",
      }
    }
  },

}

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 1.5rem;
  justify-content: center;
  align-items: center;
  width: 30vw;
  min-width: 400px;
  min-height: 350px;
  height: 35vh;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
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

.user_title{
  color: #6F6C99;

}

.input {
  margin-top: 1rem;
  width: 15rem;
}

.logo_svg {
  width: 8rem;
}

.btn {
  width: 15rem;
  margin: 1.5rem;
}
</style>