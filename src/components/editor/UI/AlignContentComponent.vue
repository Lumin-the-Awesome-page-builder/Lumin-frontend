<template>
  <div class="wrapContainer">
    <OptionHeadingComponent
      title="Align Content"
      popoverTitle="Align content"
      popoverText="Свойство align-content в CSS управляет распределением свободного пространства по поперечной оси между строками элементов внутри флекс- и грид-контейнеров, а также внутри блочных элементов."
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
          height="15px"
          :viewBox="index === 2 ? '0 0 15 15' : '0 -960 960 960'"
          width="15px"
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
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import { NButton } from 'naive-ui';
import AlignContentProp from '@/editor/properties/AlignContentProp.ts';

export default {
  name: 'alignContentComponent',
  components: { OptionHeadingComponent, "n-button": NButton },    props: {
    prop: {
      type: AlignContentProp
    }
  },
  data: () => ({
    activeButton: null as number | null,
    buttonsConf: {
      center: {
        path: 'M120-120v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z',
      },
      end: {
        path: 'M800-80v-800h80v800h-80ZM560-280v-400h120v400H560Zm-240 0v-400h120v400H320Z',
      },
      start: {
        path: 'M2.5 1.25L2.5 13.75L1.25 13.75L1.25 1.25L2.5 1.25ZM6.25 4.375L6.25 10.625L4.375 10.625L4.375 4.375L6.25 4.375ZM10 4.375L10 10.625L8.125 10.625L8.125 4.375L10 4.375Z',
      },
      between: {
        path: 'M800-80v-800h80v800h-80ZM80-80v-800h80v800H80Zm440-480v-120h200v120H520Zm-280 0v-120h200v120H240Zm280 280v-120h200v120H520Zm-280 0v-120h200v120H240Z',
      },
      around: {
        path: 'M800-80v-800h80v800h-80ZM80-80v-800h80v800H80Zm480-200v-400h120v400H560Zm-280 0v-400h120v400H280Z',
      },
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
