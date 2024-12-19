<template>
  <div class="wrapContainer">
    <OptionHeadingComponent
      title="Form Name"
      popoverTitle="Имя формы"
      popoverText="Вы можете задать для каждой формы свое имя, оно будет использоваться при отрисовки данных в личном кабинете."
    />
    <n-input class="change-btn" v-model:value="value" type="text" @change="change"></n-input>
  </div>
</template>

<script lang="ts">
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import FormNameProp from '@/editor/properties/FormNameProp';

export default {
  name: 'InputName',
  components: { OptionHeadingComponent },
  emits: ['changed'],
  props: {
    prop: {
      type: FormNameProp
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