<template>
  <div class="wrapContainer">
    <OptionHeadingComponent
      title="Text Content"
      popoverTitle="Text content"
      popoverText="Вы можете изменить текст отображаемый внутри компонента"
    />
    <n-input
      @change="update"
      v-model:value="value"
      type="textarea"
      placeholder="Basic Textarea"
    />
  </div>
  <n-divider />
</template>

<script lang="ts">

import ContentProp from '@/editor/properties/ContentProp.ts';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';

export default {
  name: 'ContentComponent',
  components: { OptionHeadingComponent },
  emits: ['changed'],
  props: {
    prop: {
      type: ContentProp
    }
  },
  data: () => ({
    value: ""
  }),
  mounted() {
    this.value = this.prop.value[0] ? this.prop.value[0] : this.prop.defaultValue[0];
  },
  created() {
  },
  methods: {
    update() {
      this.prop.setValue([this.value])
      this.$emit('changed')
    }
  }
}
</script>

<style scoped>

</style>