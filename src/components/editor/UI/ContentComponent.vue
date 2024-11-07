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
</template>

<script lang="ts">

import ContentProp from '@/editor/properties/ContentProp.ts';
import OptionHeadingComponent from '@/components/editor/OptionHeadingComponent.vue';

export default {
  name: 'ContentComponent',
  components: { OptionHeadingComponent },
  props: {
    prop: {
      type: ContentProp
    }
  },
  data: () => ({
    value: ""
  }),
  mounted() {
    console.log(this.prop.value)
    console.log(this.prop.defaultValue)
    this.value = this.prop.value[0] ? this.prop.value[0] : this.prop.defaultValue[0];
  },
  methods: {
    update() {
      this.prop.setValue([this.value])
    }
  }
}
</script>

<style scoped>

</style>