<template>
  <div id="btn-container-id"></div>
</template>

<script>
import useAuthStore from '@/store/auth.store';
import router from '@/router';
import AuthYandexInputDto from '@/api/modules/auth/dto/login/auth-yandex-input.dto';

export default {
  name: "YandexAuthComponent",
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

    loadScript('https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js')
      .then(() => {
        const oauthQueryParams = {
          client_id: 'd38c9e6db7d34ec4ae4b7067cb4c0ad7',
          response_type: 'token',
        };
        const tokenPageOrigin = "https://lumin.dudosyka.ru/auth"; // Заменить на сервак

        if (window.YaAuthSuggest) {
          window.YaAuthSuggest.init(
            oauthQueryParams,
            tokenPageOrigin,
            {
              view: "button",
              parentId: "btn-container-id",
              buttonSize: 'm',
              buttonView: 'icon',
              buttonTheme: 'light',
              buttonBorderRadius: "18",
              buttonIcon: 'ya',
            }
          )
            .then(({ handler }) => handler())
            .then(async (response) => {
                const authStore = useAuthStore()

                const login = await authStore.loginViaYandex(new AuthYandexInputDto(response.data.token));

                if (login) {
                  await router.push({ path: "/dashboard" });
                } else {
                  alert("Bad credentials")
                }
            })
            .catch(error => console.log('Обработка ошибки', error));
        } else {
          console.error('YaAuthSuggest is not defined');
        }
      })
      .catch((error) => {
        console.error('Не удалось загрузить скрипт', error);
      });
  }
}
</script>

<style scoped>

</style>