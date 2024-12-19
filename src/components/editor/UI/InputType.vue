<template>
  <div class="wrapContainer">
    <OptionHeadingComponent
      title="Input Type"
      popoverTitle="Тип поля"
      popoverText="Тип поля может быть текст, email или дата. Согласно выбранному типу будет проходить валидация"
    />
    <n-dropdown type="divider" trigger="click" :menu-props="menuProps" :options="options" class="input" @select="handleSelect">
      <n-button class="btn" id="hover-btn">{{ valueLabel }}</n-button>
    </n-dropdown>
  </div>
</template>

<script lang="ts">
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import InputTypeProp from '@/editor/properties/InputTypeProp';

export default {
  name: 'InputName',
  components: { OptionHeadingComponent },
  emits: ['changed'],
  props: {
    prop: {
      type: InputTypeProp
    }
  },
  data: () => ({
    value: "",
    valueLabel: "",
    menuProps: () => ({
      style: {
        width: '15rem',
        textAlign: 'center',
      },
      placement: 'bottom-end'
    }),
    optionsKeyToLabel: {
      text: 'Текстовое поле',
      email: 'Электронная почта',
      date: 'Поле ввода даты'
    },
    options: [
        {
          label: 'Текстовое поле',
          key: 'text',
        },
        {
          label: 'Электронная почта',
          key: 'email',
        },
        {
          label: 'Поле ввода даты',
          key: 'date',
        },
    ]
  }),
  mounted() {
    this.value = this.prop.value[0];
    this.valueLabel = this.optionsKeyToLabel[this.value];
  },
  methods: {
    handleSelect(key) {
      this.valueLabel = this.optionsKeyToLabel[key];
      this.value = key
      this.prop.setValue([this.value])
      this.$emit('changed')
    }
  },
};
</script>

<style scoped>
  .wrapContainer {
    margin-bottom: 1.5rem;
  }
  .change-btn {
    margin-top: .5rem;
  }
</style>