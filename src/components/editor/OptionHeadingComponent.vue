<template>
    <div class="heading-row">
      <h3 class="options-heading">{{ title }}</h3>
      <n-popover width="20rem" trigger="click">
        <template #trigger>
          <svg
            class="btn-info"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="15px"
            height="15px"
          >
            <path
              d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42s-42-18.804-42-42s18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
              fill="#7b7bfe"
            />
          </svg>
        </template>
        <template #header>
          <n-text strong depth="1">{{ popoverTitle }}</n-text>
        </template>
        <n-text depth="1">{{ popoverText }}</n-text>
      </n-popover>
    </div>
  </template>
  
  <script lang="ts">
  import { NPopover, NText } from 'naive-ui'
  
  export default {
    name: 'OptionHeadingComponent',
    components: {
      "n-popover": NPopover,
      "n-text": NText,
    },
    props: {
      title: {
        type: String,
        required: true,
      },
      popoverTitle: {
        type: String,
        required: true,
      },
      popoverText: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .heading-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .options-heading {
    font-size: 20px;
    font-weight: 600;
    color: #6f6c99;
  }
  .btn-info {
    padding: 0;
    cursor: pointer;
    opacity: 0.5;
    border: none !important;
    transition: opacity 0.3s ease-in-out;
  }
  .btn-info:hover {
    opacity: 1;
  }
  .btn-info:focus {
    outline: transparent;
    opacity: 1;
  }
  </style>
  