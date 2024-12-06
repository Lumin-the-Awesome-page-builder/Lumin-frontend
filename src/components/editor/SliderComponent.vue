<template>
  <div class="sliderContainer">
    <h3 class="subheading">{{ subheading }}</h3>
    <n-slider 
      class="slider"
      @update:value="onUpdateValue"
      v-model:value="value"
      :format-tooltip="formatTooltip" 
      :marks="marks" 
      step="mark" 
      :class="{ 'hide-marks': !showMarks }"
    />
  </div>
</template>

<script lang="ts">
import { NSlider } from 'naive-ui'

export default {
  name: 'SliderComponent',
  components: { 'n-slider': NSlider },
  emits: ["update"],
  props: {
    marks: {
      type: Object,
      required: true,
    },
    initialValue: {
      type: Number,
      default: 10,
    },
    subheading: {
      type: String,
      required: true,
    },
    showMarks: { 
      type: Boolean,
      default: true, 
    },
  },
  created() {
    this.value = this.initialValue
  },
  data: () => ({
    value: null
  }),
  methods: {
    formatTooltip(value: number) {
      return this.marks[value] || `${value}`;
    },
    onUpdateValue() {
      this.$nextTick(() => {
        this.$emit("update", this.value);
      })
    }
  }
};
</script>

<style scoped>
.sliderContainer {
  display: flex;
  flex-direction: column;
}

.slider {
  --n-fill-color: #7b7bfe!important;
  --n-dot-border-active: 2px solid #7b7bfe!important;
  --n-fill-color-hover: #7b7bfe!important;
}

.subheading {
  font-weight: 500;
  color: #6f6c99;
}


:deep(.hide-marks .n-slider-marks) {
  display: none !important;
}
</style>
