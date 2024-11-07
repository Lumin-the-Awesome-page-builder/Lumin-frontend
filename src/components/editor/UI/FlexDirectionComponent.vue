<template>
  <div class="wrapContainer">
    <OptionHeadingComponent
      title="Flex Direction"
      popoverTitle="Flex direction"
      popoverText="Свойство flex-direction в CSS определяет направление элементов в контейнере — горизонтальное или вертикальное."
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
          height="20px"
          viewBox="0 0 20 20"
          width="20px"
          :fill="activeButton === index ? '#ffffff' : '#7b7bfe'"
        >
          <path :d="button.path" />
        </svg>
      </n-button>
    </n-button-group>
  </div>
  <n-divider />
</template>

<script lang="ts">
import OptionHeadingComponent from '../OptionHeadingComponent.vue';
import { NButton } from 'naive-ui';
import FlexDirectionProp from '@/editor/properties/FlexDirectionProp.ts';

export default {
  name: 'FlexDirectionComponent',
  components: { OptionHeadingComponent, "n-button": NButton },
  props: {
    prop: FlexDirectionProp,
  },
  data: () => ({
    activeButton: null as number | null,
    buttonsConf: {
      col: {
        path: 'M17 6.5a.5.5 0 0 0-.324-.468l-8-3a.5.5 0 1 0-.351.936L11 4.972v3.057L8.325 9.032a.5.5 0 0 0 .35.936l8-3A.5.5 0 0 0 17 6.5zm-1.924 0L12 7.654V5.347L15.076 6.5zM5 3.5a.5.5 0 0 1 1 0v11.793l1.146-1.146a.5.5 0 1 1 .708.707l-2 2a.498.498 0 0 1-.351.146h-.006a.498.498 0 0 1-.35-.146l-2-2a.5.5 0 1 1 .707-.707L5 15.293V3.5zm8 7a.5.5 0 1 1 1 0v4.793l1.146-1.146a.5.5 0 0 1 .708.707l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.707L13 15.293V10.5z',
      },
      row: {
        path: 'M6.5 3a.5.5 0 0 1 .468.324l3 8a.5.5 0 0 1-.936.352L8.029 9H4.972l-1.004 2.676a.5.5 0 0 1-.936-.352l3-8A.5.5 0 0 1 6.5 3zm0 1.924L5.347 8h2.307L6.5 4.924zm8.354-.778a.5.5 0 1 0-.707.708L15.293 6H10.5a.5.5 0 0 0 0 1h4.793l-1.146 1.146a.5.5 0 1 0 .707.708l2-2a.5.5 0 0 0 0-.708l-2-2zm0 8a.5.5 0 0 0-.707.708L15.293 14H3.5a.5.5 0 0 0 0 1h11.793l-1.146 1.146a.5.5 0 0 0 .707.708l2-2a.5.5 0 0 0 0-.708l-2-2z',
      }
    },
  }),
  mounted() {
    const value = this.prop.value[0] ? this.prop.value[0] : this.prop.defaultValue[0]
    this.activeButton = Object.keys(this.buttonsConf).indexOf(value)
  },
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
