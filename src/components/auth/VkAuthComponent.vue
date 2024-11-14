<template>
  <div id="vkid-container"></div>
</template>

<script>
import useAuthStore from '@/store/auth.store';
import router from '@/router';
import AuthVkInputDto from '@/api/modules/auth/dto/login/auth-vk-input.dto';
import appConf from '@/api/conf/app.conf';
import { useNotification } from 'naive-ui';
import { defineComponent } from 'vue';

export default defineComponent({
  name: "VKIDAuthComponent",
  setup() {
    return { notification: useNotification() };
  },
  mounted() {
    const loadScript = (url) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${url}`));
        document.head.appendChild(script);
      });
    };

    loadScript('https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js')
      .then(() => {
        if ('VKIDSDK' in window) {
          const VKID = window.VKIDSDK;

          // Инициализация конфигурации
          VKID.Config.init({
            app: 52585823,
            redirectUrl: `https://${appConf.redirectUrl}/auth`,
            responseMode: VKID.ConfigResponseMode.Callback,
            source: VKID.ConfigSource.LOWCODE,
            scope: "email",
          });

          const oneTap = new VKID.OneTap();

          oneTap.render({
            container: document.getElementById('vkid-container'),
            showAlternativeLogin: true,
            styles: {
              width: 40,
              height: 37,
            }
          })
            .on(VKID.WidgetEvents.ERROR, vkidOnError)
            .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, function (payload) {
              const code = payload.code;
              const deviceId = payload.device_id;

              VKID.Auth.exchangeCode(code, deviceId)
                .then(vkidOnSuccess)
                .catch(vkidOnError);
            });

          // Обработчик успеха
          const vkidOnSuccess = async (data) => {
              console.log(this.notification)
              const userData = await VKID.Auth.userInfo(data.access_token);
              const authStore = useAuthStore()

              const login = await authStore.loginViaVk(new AuthVkInputDto(userData.user.user_id, userData.user.email));

              login.toastIfError(this.notification);

              if (login.success) {
                await router.push({ path: "/dashboard" });
              }
          }

          // Обработчик ошибки
          function vkidOnError(error) {
            console.error('Ошибка:', error);
          }
        } else {
          console.error('VKIDSDK is not defined');
        }
      })
      .catch((error) => {
        console.error('Не удалось загрузить скрипт', error);
      });
  }
})
</script>

<style scoped>

</style>