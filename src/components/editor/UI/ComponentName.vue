<template>
  <div class="wrapContainer">
    <OptionHeadingComponent
      title="Component Name"
      popoverTitle="Имя компонента"
      popoverText="Вы можете задать для каждого компонента свое имя, чтобы удобнее искать их среди остальных блоков."
    />
    <n-input class="change-btn" v-model:value="value" type="text" @change="change"></n-input>
  </div>
</template>

<script lang="ts">
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import ComponentNameProp from '@/editor/properties/ComponentNameProp.ts';

export default {
  name: 'ComponentName',
  components: { OptionHeadingComponent },
  emits: ['changed'],
  props: {
    prop: {
      type: ComponentNameProp
    }
  },
  data: () => ({
    value: ""
  }),
  mounted() {
    this.value = this.prop.value[0];
  },
  methods: {
    change() {
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