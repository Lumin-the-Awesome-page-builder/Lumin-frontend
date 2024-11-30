<template>
  <div class="container">
    <div class="logo">
      <img src="@/assets/svg/Lumin_logo.svg" class="logo_svg">
    </div>
    <div class="inputs_container">
      <h2 class="container_title title">Авторизация</h2>
      <div class="block">
        <n-p class="block_title title">Адрес эл. почты</n-p>
        <n-input v-model:value="emailData" placeholder="mail@example.ru" type="text" class="input">
          <template #prefix>
            <img src="@/assets/svg/email.svg" class="imgLogin"/>
          </template>
        </n-input>
      </div>
      <div class="block">
        <n-p class="block_title title">Пароль</n-p>
        <n-input v-model:value="passwordData" placeholder="password" :type="typeInput" class="input" >
          <template #prefix>
            <n-icon :component="icon" color="#000000FF" @click="showPassword" class="passInp"/>
          </template>
        </n-input>
      </div>
      <n-button @click="login" color="#3535FFA6" class="btn">Войти</n-button>
      <div class="signup-block">
        <p>Нет аккаунта?</p><a class="signup" @click="signUp">Зарегестрируйтесь!</a>
      </div>
    </div>
  <div class="line"></div>
  <div class="socialsNetworkBlock">
    <VkAuthComponent class="socialsNetworkIcon"/>
    <YandexAuthComponent class="socialsNetworkIcon" @click="loginWithYandex"/>
  </div>
    <div class="line">
      <ExampleComponent/>
    </div>
<!--    <div class="line">-->
<!--      <div class="exceptions">-->
<!--        <n-button @click="throwValidationException">Throw Validation Exception</n-button>-->
<!--        <n-button @click="throwNetworkException">Throw Network Exception</n-button>-->
<!--      </div>-->
<!--      <div class="global">-->
<!--        <n-button @click="rejectPromise">Reject Promise</n-button>-->
<!--        <n-button @click="error">Throw Error</n-button>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script lang="ts">

import { EyeOff, EyeSharp } from '@vicons/ionicons5';
import useAuthStore from '@/store/auth.store.ts';
import AuthInputDto from '@/api/modules/auth/dto/login/auth-input.dto.ts';
import router from '@/router/index.ts'
import VkAuthComponent from '@/components/auth/VkAuthComponent.vue';
import AuthYandexInputDto from '@/api/modules/auth/dto/login/auth-yandex-input.dto.ts';
import YandexAuthComponent from '@/components/auth/YandexAuthComponent.vue';
import yandexConf from '@/api/conf/yandex.conf.ts';
import appConf from '@/api/conf/app.conf.ts';
import { defineComponent } from 'vue'
import { useNotification } from 'naive-ui';
import ValidationException from "@/utils/exceptions/validation-exception.ts";
import NetworkException from "@/utils/exceptions/network-exception.ts";
import ExampleComponent from "@/components/ExampleComponent.vue";

export default defineComponent({
  name: "LoginComponent",
  components: {ExampleComponent, YandexAuthComponent, VkAuthComponent },
  setup() {
    return { notification: useNotification() };
  },
  data() {
    return {
      emailData: "",
      passwordData: "",
      showPass: false,
      typeInput: "password",
      icon: EyeSharp
    }
  },
  created() {
    this.checkLoginStatus();
  },
  methods: {
    signUp() {
      router.push({ name: 'signup' });
    },
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
    },
    async login() {
      const authStore = useAuthStore()

      const login = await authStore.login(new AuthInputDto(this.emailData, this.passwordData));

      login.toastIfError(this.notification)

      if (login.success) {
        await router.push({ path: "/dashboard" });
      }
    },
    loginWithYandex() {
      window.location.href = `https://oauth.yandex.ru/authorize?client_id=${yandexConf.clientId}&response_type=token&redirect_uri=https%3A%2F%2F${appConf.redirectUrl}%2Fauth&widget_kind=button-stub&suggest_hostname=https%3A%2F%2F${appConf.redirectUrl}&et=${Date.now()}`
      localStorage.setItem('authByYandex', true);
    },
    async checkLoginStatus() {
      const token = localStorage.getItem('authByYandex');
      if (token) {
        const authStore = useAuthStore()

        const urlParams = window.location.href;
        const accessCode = this.findToken(urlParams);
        const login = await authStore.loginViaYandex(new AuthYandexInputDto(accessCode));

        login.toastIfError(this.notification);

        if (login.success) {
          await router.push({ path: "/dashboard" });
        } else {
          localStorage.removeItem('authByYandex');
        }
      }
    },
    findToken(href: string): string {
      let slice = href.split('#')[1]
      slice = slice.slice(13)
      let token = "";
      for (let i = 0; i < slice.length; i++) {
        if (slice[i] == "&") {
          break
        }else {
          token += slice[i]
        }
      }
      return token
    },
    throwValidationException() {
      throw new ValidationException(
          `Failed to validate data`,
          `422`
      )
    },
    throwNetworkException() {
      throw new NetworkException(
          `Failed to fetch data from some url`,
          `404`
      );
    },
    rejectPromise() {
      new Promise((resolve, reject) => {
        reject("Something went wrong. Its rejected promise");
      });
    },
    error() {
      throw new DOMException('Some error in dom')
    }
  }

})
</script>

<style scoped>

.exceptions{
  display: flex;
  flex-direction: row;
  padding-top: 55px;
  column-gap: 0.5rem;
}
.global {
  display: flex;
  flex-direction: row;
  padding-top: 15px;
  column-gap: 11rem;
}
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
  display: flex;
  padding: 5%;
  justify-content: space-evenly;
  width: 45%;
  align-self: center;
}

.container_title {
  cursor: default;
}

.block_title {
  margin-top: 1rem;
  cursor: default;
}


.socialsNetworkIcon {
  cursor: pointer;
}
.signup-block {
  display: flex;
  flex-direction: row;
  column-gap: .5rem;
  padding-bottom: 7%;
}

.signup {
  text-decoration: underline;
}
.signup:hover {
  cursor: pointer;
  text-decoration: none;
}
</style>