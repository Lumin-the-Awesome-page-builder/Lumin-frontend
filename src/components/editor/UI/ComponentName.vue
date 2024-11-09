<template>
  <div class="wrapContainer">
    <OptionHeadingComponent
      title="Component Name"
      popoverTitle="Имя компонента"
      popoverText="Вы можете задать для каждого компонента свое имя, чтобы удобнее искать их среди остальных блоков."
    />
    <n-input class="change-btn" v-model:value="value" type="text" @update:value="change"></n-input>
  </div>
</template>

<script lang="ts">
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import ComponentNameProp from '@/editor/properties/ComponentNameProp.ts';

export default {
  name: 'ComponentName',
  components: { OptionHeadingComponent },
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
      console.log(this.value)
      this.prop.setValue([this.value])
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