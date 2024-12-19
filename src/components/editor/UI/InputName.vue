<template>
  <div class="wrapContainer">
    <OptionHeadingComponent
      title="Input Name"
      popoverTitle="Имя поля"
      popoverText="Вы можете задать для каждого поля свое имя, оно будет использоваться при отправке данных на сервер."
    />
    <n-input class="change-btn" v-model:value="value" type="text" @change="change"></n-input>
  </div>
</template>

<script lang="ts">
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';
import InputNameProp from '@/editor/properties/InputNameProp';

export default {
  name: 'InputName',
  components: { OptionHeadingComponent },
  emits: ['changed'],
  props: {
    prop: {
      type: InputNameProp
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