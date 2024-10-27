<template>
  <div class="container">
    <div class="logo">
      <img src="../assets/svg/Lumin_logo.svg" class="logo_svg">
    </div>
    <div class="inputs_container">
      <h2 class="container_title title">Авторизация</h2>
      <div class="block">
        <n-p class="block_title title">Адрес эл. почты</n-p>
        <n-input v-model="emailData" placeholder="mail@example.ru" type="text" class="input">
          <template #prefix>
            <img src="../assets/svg/email.svg" class="imgLogin"/>
          </template>
        </n-input>
      </div>
      <div class="block">
        <n-p class="block_title title">Пароль</n-p>
        <n-input v-model="passwordData" placeholder="password" :type="typeInput" class="input" >
          <template #prefix>
            <n-icon :component="icon" color="#000000FF" @click="showPassword" class="passInp"/>
          </template>
        </n-input>
      </div>
      <n-button color="#3535FFA6" class="btn">Войти</n-button>
<!--      <router-link to="/dashboard" class="btn">Dashboard</router-link>-->
    </div>
  <div class="line"></div>
  <div class="socialsNetworkBlock">
    <img src="../assets/svg/Vk.svg" class="socialsNetworkImg"/>
    <img src="../assets/svg/Yandex.svg" class="socialsNetworkImg"/>
  </div>
  </div>
</template>

<script lang="ts">


import { EyeOff, EyeSharp } from '@vicons/ionicons5';


export default {
  name: "LoginComponent",
  computed: {
    EyeOff() {
      return EyeOff
    },
    EyeSharp() {
      return EyeSharp
    },
  },
  data() {
    return {
      emailData: {
        default: "",
      },
      passwordData:{
        default: "",
      },
      showPass: false,
      typeInput: "password",
      icon: EyeSharp
    }
  },
  methods: {
    showPassword(){
      if(this.showPass){
        this.typeInput = "password"
        this.icon = EyeSharp
        this.showPass = false
      } else {
        this.typeInput = "text"
        this.icon = EyeOff
        this.showPass = true
      }
    }
  }

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
  height: max-content;
  min-width: 400px;
  min-height: 400px;
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
}

.input {
  width: 15rem;
}

.logo_svg {
  width: 8rem;
}

.btn {
  width: 15rem;
  margin: 1.5rem;
}


.imgLogin {
  width: 1rem;
  height: auto;
}

.passInp {
  cursor: pointer;
}

.line {
  background-color: #E2E2E8;
  width: 100%;
  height: 1px;
}

.socialsNetworkBlock {
  width: 30%;
  display: flex;
  padding: 5%;
  justify-content: space-around;
}

.socialsNetworkImg {
  cursor: pointer;
  opacity: 0.37;
  transition: opacity 0.3s ease-in-out;
}

.socialsNetworkImg:hover {
  opacity: 1;
}

.container_title {
  cursor: default;
}

.block_title {
  margin-top: 1rem;
  cursor: default;
}
</style>