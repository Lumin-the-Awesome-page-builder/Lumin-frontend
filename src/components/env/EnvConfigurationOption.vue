<template>
  <div class="env-option" @click="changeSelected">
    <span class="option-name">
        {{ name }}
    </span>

    <n-checkbox
      @update:checked="changeSelected"
      :checked="selected"
    />
  </div>
</template>
<script lang="ts">
export default {
  name: "EnvConfigurationOption",
  props: {
    name: String,
  },
  data: () => ({
    selected: false
  }),
  emits: ["selected"],
  methods: {
    changeSelected() {
      this.selected = !this.selected;
      console.log(this.selected);
    }
  }
}
</script>
<style>
  .env-option {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
    border-radius: 1rem;
    border: 1px solid #c5c3e5;
    cursor: pointer;
  }
  .env-option > .option-name {
    font-size: 18px;
    font-weight: 600;
    color: #6f6c99; 
  }
</style>