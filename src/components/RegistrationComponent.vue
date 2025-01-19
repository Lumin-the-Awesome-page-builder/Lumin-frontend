<template>
  <div class="container">
    <div class="logo">
      <img src="@/assets/svg/Lumin_logo.svg" class="logo_svg">
    </div>
    <div class="inputs_container">
      <h2 class="container_title title">Регистрация</h2>
      <div class="block">
        <n-p class="block_title title">Адрес эл. почты</n-p>
        <n-input
            v-model:value="emailData"
            placeholder="mail@example.ru"
            type="text"
            class="input"
            @blur="validateEmail"
        >
          <template #prefix>
            <img src="@/assets/svg/email.svg" class="imgLogin"/>
          </template>
        </n-input>
      </div>
      <p v-if="emailError" class="error-message">{{ emailError }}</p>

      <div class="block">
        <n-p class="block_title title">Пароль</n-p>
        <n-input
            v-model:value="passwordData"
            placeholder="password"
            :type="typeInput"
            class="input"
            @blur="validatePassword"
        >
          <template #prefix>
            <n-icon :component="icon" color="#000000FF" @click="showPassword" class="passInp"/>
          </template>
        </n-input>
      </div>
      <p v-if="passwordError" class="error-message">{{ passwordError }}</p>

      <n-button @click="register" color="#3535FFA6" class="btn">Зарегистрироваться</n-button>
    </div>
  <div class="line"></div>
    <div class="socialsNetworkBlock">
      <VkAuthComponent class="socialsNetworkImg"/>
      <YandexAuthComponent class="socialsNetworkImg" @click="loginWithYandex"/>
    </div>
  </div>
</template>

<script lang="ts">


import { EyeOff, EyeSharp } from '@vicons/ionicons5';
import useAuthStore from '@/store/auth.store.ts';
import router from '@/router/index.ts'
import RegistrationInputDto from '@/api/modules/auth/dto/registration-input.dto.ts';
import VkAuthComponent from '@/components/auth/VkAuthComponent.vue';
import YandexAuthComponent from '@/components/auth/YandexAuthComponent.vue';
import yandexConf from '@/api/conf/yandex.conf.ts';
import appConf from '@/api/conf/app.conf.ts';
import { defineComponent } from 'vue';
import { useNotification } from 'naive-ui';

export default defineComponent({
  name: "RegistrationComponent",
  components: { YandexAuthComponent, VkAuthComponent },
  setup() {
    return { notification: useNotification() };
  },
  data() {
    return {
      emailData: "",
      passwordData: "",
      showPass: false,
      typeInput: "password",
      icon: EyeSharp,
      emailError: "",
      passwordError: ""
    }
  },
  methods: {
    showPassword() {
      this.showPass = !this.showPass;
      this.typeInput = this.showPass ? "text" : "password";
      this.icon = this.showPass ? EyeOff : EyeSharp;
    },
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = emailPattern.test(this.emailData) ? "" : "Введите корректный адрес электронной почты.";
    },
    validatePassword() {
      const minLengthPattern = /^.{8,}$/; // Проверка на длину содержать 8 или более символов
      const digitPattern = /(?=.*\d)/; // Проверка на наличие хотя бы одной цифры
      const englishLettersPattern = /^[a-zA-Z0-9]+$/; // Проверка на наличие только английских букв и цифр

      if (!englishLettersPattern.test(this.passwordData)) {
        this.passwordError = "Пароль должен содержать только английские буквы.";
      } else if (!minLengthPattern.test(this.passwordData)) {
        this.passwordError = "Пароль должен содержать 8 или более символов.";
      } else if (!digitPattern.test(this.passwordData)) {
        this.passwordError = "Пароль должен содержать хотя бы одну цифру.";
      } else {
        this.passwordError = "";
      }
    },
    async register() {
      if (this.emailError || this.passwordError) return; // Не продолжать регистрацию при наличии ошибок

      const authStore = useAuthStore();
      const registration = await authStore.register(new RegistrationInputDto(this.emailData, this.passwordData));

      registration.toastIfError(this.notification)

      if (registration.success) {
        await router.push({ path: "/dashboard" });
      }
    },
    loginWithYandex() {
      window.location.href = `https://oauth.yandex.ru/authorize?client_id=${yandexConf.clientId}&response_type=token&redirect_uri=https%3A%2F%2F${appConf.redirectUrl}%2Fauth&widget_kind=button-stub&suggest_hostname=https%3A%2F%2F${appConf.redirectUrl}&et=${Date.now()}`
      localStorage.setItem('authByYandex', true);
    },
  }

})
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
  opacity: 1;
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

.error-message {
  color: red;
  font-size: 12px;
}
</style>