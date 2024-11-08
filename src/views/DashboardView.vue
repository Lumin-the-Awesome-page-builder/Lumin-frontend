<template>
    <HelloFormComponent/>
    <ProjectPreviewModal />
    <HeaderComponent/>
    <div class="dashboard">
        <DashboardComponent />
        <div class="footer">
          <n-p class="footerText">LuminTech 2024</n-p>
        </div>
    </div>
</template>

<script lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue';
import DashboardComponent from '@/components/DashboardComponent.vue'
import ProjectPreviewModal from '@/components/modals/ProjectPreviewModal.vue'
import { NConfigProvider } from 'naive-ui';
import HelloFormComponent from '@/components/modals/HelloFormComponent.vue';

export default {
    name: 'DashboardView',
    components: { HelloFormComponent, ProjectPreviewModal, NConfigProvider, HeaderComponent, DashboardComponent }
};
</script>

<style scoped>
body {
    width: 100vw;
    height: 100%;
    flex-direction: column;
    align-items: stretch;
    margin: 0;
    padding: 0;
}

.dashboard {
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #f4f4f4;
    width: 100vw;
    height: 100vh;
    justify-content: space-between
}

.footer {
  width: 100%;
  height: 6vh;
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