<template>
<n-config-provider :theme-overrides="themeOverrides">
  <router-view />
</n-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NConfigProvider, GlobalThemeOverrides } from 'naive-ui';

export default defineComponent({
  components: { NConfigProvider },
  data() {
    return {
      themeOverrides: {
        Checkbox: {
          boxShadowFocus: '0 0 0 2px rgb(90 24 160 / 20%)',
          borderHover: '1px solid #646cff',
          borderChecked: '1px solid #646cff',
          borderFocus: '1px solid #646cff',
          colorChecked: '#646cff',
          sizeMedium: '23px'
        },
        Input: {
          boxShadowFocus: '0 0 0 2px rgb(90 24 160 / 20%)',
          borderHover: '1px solid #646cff',
          borderFocus: '1px solid #646cff',
        },
      } as GlobalThemeOverrides,
    };
  },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
