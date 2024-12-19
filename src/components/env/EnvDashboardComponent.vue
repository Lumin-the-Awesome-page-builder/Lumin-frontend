<template>
    <n-notification-provider>
      <HeaderComponent
          :show-project-controls="false"
      />
      
      <div class="dashboard">
        <div class="content-wrapper">
          <slot name="header"></slot>

          <slot name="content"></slot>
        
        </div>
        
        <div class="footer">
          <n-p class="footerText">LuminTech 2024</n-p>
        </div>
      </div>
    </n-notification-provider>
  </template>
  
  
  <script lang="ts">
  import HeaderComponent from '@/components/HeaderComponent.vue';
  
  export default {
      name: "EnvDashboardComponent",
      components: {
          HeaderComponent
      }
  }
  
  </script>
  
  <style>
  
  .content-wrapper {
    width: 100%;
    gap: 1rem;
    max-width: 90vw;
    display: flex;
    flex-direction: column;
  }
  
  .search-input {
    border-radius: 10px;
  }
  
  .prj-count {
    color: rgba(53, 53, 71, 0.49);
    font-size: 12px;
    font-weight: 400;
    padding-top: 5px;
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