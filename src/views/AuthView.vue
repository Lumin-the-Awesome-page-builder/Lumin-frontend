<template>
  <div class="parentContainer">
    <div class="mainPartContent">
      <LoginComponent></LoginComponent>
    </div>
    <div class="footer">
      <n-p class="footerText">LuminTech 2024</n-p>
    </div>
  </div>


<!--  <HelloFormComponent></HelloFormComponent>-->
<!--  <DeleteFormComponent project-name="test"></DeleteFormComponent>-->
</template>

<script lang="ts">
import LoginComponent from "@/components/LoginComponent.vue";
import ConfirmationFormComponent from '@/components/ConfirmationFormComponent.vue';
import HelloFormComponent from '@/components/HelloFormComponent.vue';
import DeleteFormComponent from '@/components/DeleteFormComponent.vue';

export default {
  name: "AuthView",
  components: { DeleteFormComponent, HelloFormComponent, ConfirmationFormComponent, LoginComponent},
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
  background: linear-gradient(0deg, #F8F8F8, #F8F8F8),
  linear-gradient(180deg, rgba(255, 246, 240, 0.38) 0%, rgba(251, 232, 233, 0.31) 57.44%, rgba(252, 252, 255, 0.57) 100%);
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