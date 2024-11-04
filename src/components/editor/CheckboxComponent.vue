<template>
  <div class="sliderContainer">
    <h3 class="subheading">{{ subheading }}</h3>
    <n-checkbox :size="size" v-model="isChecked" :label="label" />
  </div>
</template>

<script lang="ts">
import { NCheckbox } from 'naive-ui'

export default {
  name: 'CheckboxComponent',
  components: { "n-checkbox": NCheckbox },
  props: {
    subheading: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: 'Включить',
    },
    size: {
      type: String,
      default: 'medium',
    },
  },
  data: () => ({
    isChecked: false,
  }),
};
</script>

<style scoped>
.subheading {
  font-weight: 500;
  color: #6f6c99;
}
</style>
