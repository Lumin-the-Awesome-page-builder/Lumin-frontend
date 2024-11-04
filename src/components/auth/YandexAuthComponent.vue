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
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${url}`));
        document.head.appendChild(script);
      });
    };

    loadScript('https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js')
      .then(() => {
        if (!window.YaAuthSuggest) {
          console.error('YaAuthSuggest is not defined');
          return;
        }
        const oauthQueryParams = {
          client_id: 'd38c9e6db7d34ec4ae4b7067cb4c0ad7',
          response_type: 'token',
          redirect_uri: 'https://beta.lumin.dudosyka.ru/auth'
        };
        const tokenPageOrigin = "https://beta.lumin.dudosyka.ru/auth";

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
          .then(({handler}) => handler())
          .then(async (response) => {
            if (response && response.data && response.data.token) {
              console.log(response);
              const authStore = useAuthStore();
              const login = await authStore.loginViaYandex(new AuthYandexInputDto(response.data.token));

              if (login) {
                await router.push({ path: "/dashboard" });
              } else {
                alert("Bad credentials");
              }
            } else {
              console.error("Ошибка: Не удалось получить токен от Яндекс OAuth");
            }
          })
          .catch(error => console.error('Обработка ошибки', error));
      })
      .catch((error) => {
        console.error('Не удалось загрузить скрипт', error);
      });
  }
}
</script>

<style scoped>

</style>