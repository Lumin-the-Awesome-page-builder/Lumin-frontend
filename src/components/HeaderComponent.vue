<template>
  <div class="header-wrapper">
    <div class="logo-wrapper">
      <img class="lumin-logo" src="@/assets/lumin-logo-1-1.svg" />
    </div>

    <n-divider style="height: 100%;" vertical />

    <div class="nav-group left">
      <div class="nav-element">
        <n-icon>
            <Projects />
          </n-icon>
          Библиотека проектов
        </div>
      <div class="nav-element">
        <n-icon>
            <Widgets />
          </n-icon>
        Библиотека виджетов</div>
    </div>

    <n-divider style="height: 100%;" vertical />

    <div class="buttons-group">
      <n-button color="#fe7b9e">
        <template #icon>
          <n-icon>
            <Delete />
          </n-icon>
        </template>
        Удалить
      </n-button>
      <n-button color="#7b7bfe">
        <template #icon>
          <n-icon>
            <Download />
          </n-icon>
        </template>
        Скачать
      </n-button>
    </div>

    <n-divider style="height: 100%;" vertical />

    <div class="nav-group right">
      <div class="nav-element">
        <n-icon>
            <Store />
          </n-icon>
        Маркетплейс</div>
      <div class="nav-element">
        <n-icon>
            <Backend />
          </n-icon>
        Backend</div>
    </div>
  </div>
</template>

<script lang="ts">
import { CodeDownload as Download, Trash as Delete, AlbumsSharp as Projects, AppsSharp as Widgets, Basket as Store, Terminal as Backend } from '@vicons/ionicons5';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    Download,
    Delete,
    Projects,
    Widgets,
    Store,
    Backend
  },
});
</script>

<style>
.header-wrapper {
  display: flex;
  justify-content: space-around;
  width: 100%;
  background: white;
  height: 70px;
  border-bottom: 1px solid #e2e2e8;
}
.logo-wrapper {
}
.nav-group {
    display: flex;
    align-items: center;
    color: #6f6c99;
    font-size: 18px;
    gap: 2rem;
    justify-content: space-between;
}
.left {
    width: 28vw;
}
.nav-element {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}
.buttons-group {
  display: flex;
  align-items: center;
  gap: 2rem;
}
</style>
