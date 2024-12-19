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
  <template v-if='value == "button"'>
    <div class="wrapContainer">
    <OptionHeadingComponent
      title="Input Name"
      popoverTitle="Текст кнопки"
      popoverText="Вы можете задать отображаемый на кнопке текст"
    />
    <n-input class="change-btn" v-model:value="valueTitle" type="text" @change="change"></n-input>
  </div>
  </template>
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
    valueTitle: "",
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
      date: 'Поле ввода даты',
      button: 'Кнопка'
    },
    options: [
        {
          label: 'Текстовое поле',
          key: 'text',
        },
        {
          label: 'Кнопка',
          key: 'button',
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
    this.valueTitle = this.prop.value[1];
    this.valueLabel = this.optionsKeyToLabel[this.value];
  },
  methods: {
    handleSelect(key) {
      this.valueLabel = this.optionsKeyToLabel[key];
      this.value = key
      this.prop.setValue(this.value, 0)
      this.$emit('changed')
    },
    change() {
      this.prop.setValue(this.valueTitle, 1)
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