<template>
  <n-notification-provider>
    <div class="parentContainer">
      <div class="mainPartContent">
        <RegistrationComponent></RegistrationComponent>
      </div>
      <div class="footer">
        <n-p class="footerText">LuminTech 2024</n-p>
      </div>
    </div>
  </n-notification-provider>
</template>

<script lang="ts">
import RegistrationComponent from '@/components/RegistrationComponent.vue';

export default {
  name: "SignupView",
  components: { RegistrationComponent },
  data() {
    return {

    }
  }
}
</script>
<style scoped>
.parentContainer {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

.mainPartContent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
  background-image: url(../assets/bg.jpg);
}

.footer {
  width: 100%;
  height: 5%;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.footerText {
  margin-left: 1.5rem;
}

</style>