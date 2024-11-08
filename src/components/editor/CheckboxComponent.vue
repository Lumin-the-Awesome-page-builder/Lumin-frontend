<template>
  <div class="sliderContainer">
    <h3 class="subheading">{{ subheading }}</h3>
    <n-checkbox @update:checked="checked" :checked="isChecked" :size="size" :label="label" />
  </div>
</template>

<script lang="ts">
import { NCheckbox } from 'naive-ui'

export default {
  name: 'CheckboxComponent',
  components: { "n-checkbox": NCheckbox },
  emits: ['update'],
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
    initValue: {
      type: Boolean,
      default: false,
    }
  },
  data: () => ({
    isChecked: 0,
  }),
  mounted() {
    this.isChecked = this.initValue
  },
  methods: {
    checked() {
      this.isChecked = this.isChecked == 1 ? 0 : 1
      this.$emit('update', this.isChecked)
    }
  }
};
</script>

<style scoped>
.subheading {
  font-weight: 500;
  color: #6f6c99;
}
</style>
