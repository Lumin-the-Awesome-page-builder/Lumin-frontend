<template>
  <div class="wrapContainer">
    <OptionHeadingComponent
      title="Justify Content"
      popoverTitle="Justify content"
      popoverText="Свойство justify-content в CSS определяет, как браузер распределяет пространство вокруг флекс-элементов вдоль главной оси контейнера."
    />
    <n-button-group>
      <n-button
        v-for="(button, index) in buttons"
        :key="index"
        :ghost="activeButton !== index"
        color="#7b7bfe"
        @click="setActiveButton(index, button)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :height="button.size || '15px'"
          :viewBox="button.viewBox"
          :width="button.size || '15px'"
          :fill="activeButton === index ? '#ffffff' : '#7b7bfe'"
        >
          <path :d="button.path" />
        </svg>
      </n-button>
    </n-button-group>
  </div>
</template>

<script lang="ts">
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import { NButton } from 'naive-ui'
import JustifyContentProp from '@/editor/properties/JustifyContentProp.ts';

export default {
  name: 'JustifyContentComponent',
  components: { OptionHeadingComponent, "n-button": NButton },
  props: {
    prop: {
      type: JustifyContentProp,
    }
  },
  data: () => ({
    activeButton: null as number | null,
    buttonsConf: {
      center: {
        path: 'M120-120v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z',
        viewBox: '0 -960 960 960',
      },
      end: {
        path: 'M2 20L22 20L22 22L2 22L2 20ZM7 14L17 14L17 17L7 17L7 14ZM7 8L17 8L17 11L7 11L7 8Z',
        viewBox: '0 0 24 24',
      },
      start: {
        path: 'M22 4L2 4L2 2L22 2L22 4ZM17 10L7 10L7 7L17 7L17 10ZM17 16L7 16L7 13L17 13L17 16Z',
        viewBox: '0 0 24 24',
      },
      around: {
        path: 'M22 4L2 4L2 2L22 2L22 4ZM22 22L2 22L2 20L22 20L22 22ZM10 11L7 11L7 6L10 6L10 11ZM10 18L7 18L7 13L10 13L10 18ZM17 11L14 11L14 6L17 6L17 11ZM17 18L14 18L14 13L17 13L17 18Z',
        viewBox: '0 0 24 24',
      },
      between: {
        path: 'M2 20L7 20L7 17L17 17L17 20L22 20L22 22L2 22L2 20ZM2 2L22 2L22 4L17 4L17 7L7 7L7 4L2 4L2 2Z',
        viewBox: '0 0 24 24',
      },
      evenly: {
        path: 'M2 20L22 20L22 22L2 22L2 20ZM2 2L22 2L22 4L2 4L2 2ZM7 14L17 14L17 17L7 17L7 14ZM7 7L17 7L17 10L7 10L7 7Z',
        viewBox: '0 0 24 24',
      }
    },
  }),
  methods: {
    setActiveButton(index: number, button) {
      const onSet = (this.activeButton == index) ? null : button.value
      this.activeButton = (this.activeButton == index) ? null : index
      this.prop.setValue(onSet)
    },
  },
  computed: {
    buttons() {
      return Object.keys(this.prop.availableValues[0]).map(key => ({
        ...this.buttonsConf[key],
        value: key
      }))
    },
  },
};
</script>

<style scoped>
.wrapContainer {
  background-color: #ffffff;
  display: flex;
  gap: 1rem;
  flex-direction: column;
}
</style>