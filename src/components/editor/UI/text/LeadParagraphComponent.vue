<template>
  <div class="wrapContainer">
    <OptionHeadingComponent
      title="Lead Paragraph"
      popoverTitle="Выделение абзаца"
      popoverText="Чтобы сделать абзац выделенным, включите опцию"
    />
    <div class="checkboxContainer">
      <CheckboxComponent
        v-for="(checkbox, index) in checkboxes"
        :key="index"
        :subheading="checkbox.subheading"
        :label="checkbox.label"
        :size="checkbox.size"
        @update="checked(index, $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import CheckboxComponent from '../../CheckboxComponent.vue';
import OptionHeadingComponent from '../../OptionHeadingComponent.vue';
import LeadParagraphProp from '@/editor/properties/text/LeadParagraphProp.ts';

export default {
  name: 'LeadParagraphComponent',
  components: {
    CheckboxComponent,
    OptionHeadingComponent,
  },
  props: {
    prop: {
      type: LeadParagraphProp
    }
  },
  computed: {
    checkboxes() {
      return [
        {
          subheading: 'Выделить абзац',
          label: 'Выделить абзац',
          size: 'large',
          value: !!this.prop.value[0],
        }
      ]
    }
  },
  methods: {
    checked(index, data) {
      if (data)
        this.prop.setValue('checked', index)
      else
        this.prop.setValue(null, index)
    }
  }
};
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
