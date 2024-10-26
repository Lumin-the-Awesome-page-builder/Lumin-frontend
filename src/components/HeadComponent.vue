<script lang="ts">
import logoImage from '@/assets/imageHead/logo.svg';
import libraryIcon from '@/assets/imageHead/library.svg';
import widgetsIcon from '@/assets/imageHead/widgets.svg';
import marketplaceIcon from '@/assets/imageHead/marketplace.svg';
import backendIcon from '@/assets/imageHead/backend.svg';

export default {
  name: 'Header',
  props: {
    logoSrc: {
      type: String,
      default: logoImage,
    },
  },
  data() {
    return {
      tabs: [
        { name: 'Библиотека проектов', icon: libraryIcon },
        { name: 'Библиотека виджетов', icon: widgetsIcon },
        { name: 'Маркетплейс', icon: marketplaceIcon },
        { name: 'Backend', icon: backendIcon },
      ],
      activeTab: 0,
    };
  },
  methods: {
    selectTab(index: number): void {
      this.activeTab = index;
    },
  },
};
</script>

<template>
  <header class="header">
    <div class="logo">
      <img :src="logoSrc" alt="Logo" class="logo-image" />
    </div>
    <div class="vertical-line"></div>
    <nav class="nav">
      <ul class="nav-list">
        <li v-for="(tab, index) in tabs" :key="index" class="nav-item"
          :class="{ active: activeTab === index }" @click="selectTab(index)">
          <img :src="tab.icon" alt="" :class="['tab-icon', { small: tab.name === 'Backend' }, 'small']"/>
          <span>{{ tab.name }}</span>
          <div v-if="index === 1" class="vertical-line tab-line"></div>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 0.0625rem solid #e0e0e0;
  border-bottom-left-radius: 0.625rem;
  border-bottom-right-radius: 0.625rem;
}

.logo {
  display: flex;
  align-items: center;
  margin-right: 2rem;
}

.logo-image {
  width: 2.5rem;
  height: 2.5rem;
}

.nav {
  flex: 1;
}

.nav-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  color: #6F6C99;
  border-radius: 0.5rem;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
}

.nav-item:hover {
  background-color: #E2E2E8;
}

.active {
  color: #3535FF;
}

.tab-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  transform: translateY(0.1rem);
}

.small {
  width: 0.75rem;
  height: 0.75rem;
  transform: translateY(0.1rem);
}

.vertical-line {
  width: 0.03rem;
  height: 3rem;
  background-color: #E2E2E8;
  margin-left: 0;
  margin-right: 0.8rem;
}

.tab-line {
  height: 3rem;
  margin-left: 2rem;
  margin-right: 0;
}
</style>
