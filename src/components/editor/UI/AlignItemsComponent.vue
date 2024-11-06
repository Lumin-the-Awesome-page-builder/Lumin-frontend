<template>
  <div class="wrapContainer">
    <OptionHeadingComponent
      title="Align Items"
      popoverTitle="Align items"
      popoverText="Свойство align-items в CSS выравнивает элементы по поперечной оси (при расположении в виде строки — по вертикали, при расположении в виде столбца — по горизонтали)."
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
import { NButton } from 'naive-ui';
import AlignItemsProp from '@/editor/properties/AlignItemsProp.ts';

export default {
  name: 'alignItemsComponent',
  components: { OptionHeadingComponent, "n-button": NButton },
  props: {
    prop: {
      type: AlignItemsProp
    }
  },
  data: () => ({
    activeButton: null as number | null,
    buttonsConf: {
      baseline: {
        path: 'M21 17L13 17L13 22L11 22L11 17L3 17L3 14L11 14L11 10L6 10L6 7L11 7L11 2L13 2L13 7L18 7L18 10L13 10L13 14L21 14L21 17Z',
        viewBox: '0 0 24 24',
      },
      start: {
        path: 'M2 2L4 2L4 22L2 22L2 2ZM6 7L22 7L22 10L6 10L6 7ZM6 14L16 14L16 17L6 17L6 14Z',
        viewBox: '0 0 24 24',
      },
      end: {
        path: 'M22 2L20 2L20 22L22 22L22 2ZM18 7L2 7L2 10L18 10L18 7ZM18 14L8 14L8 17L18 17L18 14Z',
        viewBox: '0 0 24 24',
      },
      center: {
        path: 'M4 5L16 5L16 8L4 8L4 5ZM4 12L16 12L16 15L4 15L4 12ZM18 -8.74228e-08L20 0L20 20L18 20L18 -8.74228e-08ZM-2.98023e-07 -8.74228e-07L2 -7.86805e-07L2 20L-1.17225e-06 20L-2.98023e-07 -8.74228e-07Z',
        viewBox: '0 0 24 24',
      },
      stretch: {
        path: 'M240-80 80-240l160-160 57 56-64 64h494l-63-64 56-56 160 160L720-80l-57-56 64-64H233l63 64-56 56Zm36-360 164-440h80l164 440h-76l-38-112H392l-40 112h-76Zm138-176h132l-64-182h-4l-64 182Z',
        viewBox: '0 -960 960 960',
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
  }
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