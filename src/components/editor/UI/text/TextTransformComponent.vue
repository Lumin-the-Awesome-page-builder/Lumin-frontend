<template>
    <div class="wrapContainer">
      <OptionHeadingComponent
        title="Text Transform"
        popoverTitle="Text transform"
        popoverText="Трансформация шрифта"
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
  </template>
  
  <script lang="ts">
  import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
  import { NButton } from 'naive-ui'
  import FontProp from '@/editor/properties/text/FontProp.ts';
  import TextTransformProp from '@/editor/properties/text/TextTransformProp.ts';
  
  export default {
    name: 'TextTransformComponent',
    components: { OptionHeadingComponent, "n-button": NButton },
    props: {
      prop: {
        type: TextTransformProp
      }
    },
    data: () => ({
      activeButton: null as number | null,
      buttonsConf: {
        lowercase: {
          path: 'M300-240q-51 0-81-27.5T189-340q0-44 34.5-72.5T312-441q23 0 45 4t38 11v-12q0-29-20.5-47T320-503q-23 0-42 9.5T245-466l-47-35q24-29 54.5-43t68.5-14q69 0 103 32.5t34 97.5v178h-63v-37h-4q-14 23-38 35t-53 12Zm12-54q35 0 59.5-24t24.5-56q-14-8-33.5-12.5T324-391q-32 0-50 14t-18 37q0 20 16 33t40 13Zm388 54L540-400l56-56 64 64v-248h80v248l64-64 56 56-160 160Z',
          viewBox: '0 -960 960 960',
        },
        uppercase: {
          path: 'M660-240v-248l-64 64-56-56 160-160 160 160-56 56-64-64v248h-80Zm-540 0 165-440h79l165 440h-76l-39-113H236l-40 113h-76Zm139-177h131l-65-182h-4l-62 182Z',
          viewBox: '0 -960 960 960',
        },
        capitalize: {
          path: 'M344-250v-366H224v-64h308v64H412v366h-68Zm344 10q-44 0-69-25.5T594-336v-162h-54v-58h54v-87h66v87h74v58h-74v148q0 23 10.5 36t28.5 13q9 0 18.5-3.5T736-314v65q-10 5-22 7t-26 2Z',
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
  