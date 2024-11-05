<template>
  <div class="wrapContainer">
    <OptionHeadingComponent
      title="Display Flex"
      popoverTitle="Display flex"
      popoverText="Включает flex сетку у компонента"
    />
    <div class="checkboxContainer">
      <CheckboxComponent
        v-for="(checkbox, index) in checkboxes"
        :key="index"
        :subheading="checkbox.subheading"
        :label="checkbox.label"
        :size="checkbox.size"
      />
    </div>
  </div>
</template>

<script lang="ts">
import CheckboxComponent from '@/components/editor/CheckboxComponent.vue';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';

export default {
  name: 'DisplayFlexComponent',
  components: {
    CheckboxComponent, OptionHeadingComponent
  },
  data: () => ({
    checkboxes: [
      { subheading: 'Flex-сетка', label: 'Включить сетку', size: 'large' },
      { subheading: 'Flex-wrap', label: 'Включить Flex-wrap', size: 'large' },
    ],
  }),
}
</script>

<style scoped>
.wrapContainer {
  background-color: #ffffff;
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.checkboxContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
