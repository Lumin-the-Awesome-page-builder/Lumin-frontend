<template>
    <div class="wrapContainer">
      <OptionHeadingComponent
        title="Text Decoration"
        popoverTitle="Text decoration"
        popoverText="Подчеркнутый, зачеркнутый или обычный"
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
            :viewBox="button.viewBox"
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
  import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
  import { NButton } from 'naive-ui'
  import TextDecorationProp from '@/editor/properties/text/TextDecorationProp.ts';
  
  export default {
    name: 'TextDecorationComponent',
    components: { OptionHeadingComponent, 'n-button': NButton },
    emits: ['changed'],
    props: {
      prop: {
        type: TextDecorationProp
      }
    },
    data: () => ({
      activeButton: null as number | null,
      buttonsConf: {
        none: {
          path: 'M420-160v-520H200v-120h560v120H540v520H420Z',
          viewBox: '0 -960 960 960',
        },
        line_through: {
          path: 'M80-400v-80h800v80H80Zm340-160v-120H200v-120h560v120H540v120H420Zm0 400v-160h120v160H420Z',
          viewBox: '0 -960 960 960',
        },
        underline: {
          path: 'M200-120v-80h560v80H200Zm280-160q-101 0-157-63t-56-167v-330h103v336q0 56 28 91t82 35q54 0 82-35t28-91v-336h103v330q0 104-56 167t-157 63Z',
          viewBox: '0 -960 960 960',
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
        this.$emit('changed')
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
  