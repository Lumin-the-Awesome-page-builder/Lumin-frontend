<template>
  <Workspace />
  <Controls :app="app" />
</template>

<script lang="ts">
import Workspace from '@/components/editor/Workspace.vue'
import Controls from '@/components/editor/Controls.vue'
import { App } from '@/editor/App.ts';

export default {
  props: {
    count: Number,
    initialTree: {
      type: String,
      default: JSON.stringify([
        {
          key: 'data-123-div-1729624518542',
          name: 'container',
          attrs: [],
          props: [
            { name: 'flex', value: 'flex' },
            { name: 'flex-wrap', value: 'flex-wrap' },
            { name: 'gap', value: 'g2' },
          ],
          content: null,
          children: [
            {
              key: 'data-123-div-1729624518123',
              name: 'container',
              attrs: [],
              props: [{ name: 'flex', value: 'flex' }],
              content: 'Test content',
            },
            {
              key: 'data-123-div-1729624518545',
              name: 'container',
              attrs: [],
              props: [{ name: 'flex', value: 'flex' }],
              content: 'Test content',
            },
            {
              key: 'data-123-div-1729624518547',
              name: 'container',
              attrs: [],
              props: [{ name: 'flex', value: 'flex' }],
              content: '',
            },
          ],
        },
        {
          key: 'data-123-div-1729624518542',
          name: 'container',
          attrs: [],
          props: [
            { name: 'flex', value: 'flex' },
            { name: 'flex-wrap', value: 'flex-wrap' },
            { name: 'gap', value: 'g2' },
          ],
          content: null,
          children: [
            {
              key: 'data-123-div-1729624518123',
              name: 'container',
              attrs: [],
              props: [{ name: 'flex', value: 'flex' }],
              content: 'Test content',
            },
            {
              key: 'data-123-div-1729624518545',
              name: 'container',
              attrs: [],
              props: [{ name: 'flex', value: 'flex' }],
              content: 'Test content',
            },
            {
              pure: true,
              key: 'data-123-div-1729624518547',
              name: 'pure',
              attrs: [],
              props: [{ name: 'flex', value: 'flex' }],
              content: '',
              specific: {
                html: "<style>.bordered-mine { border: 1px solid red }</style><div class='bordered-mine'>TEST</div>"
              }
            },
          ],
        },
      ])
    },
  },
  components: {
    Controls, Workspace
  },
  name: "HelloWorld",
  data: () => ({
    msg: "Hello!",
    app: App
  }),
  mounted() {
    this.app = this.$mount_editor('app-builder', String(123), this.initialTree)
    this.app.subscribe('click', () => {
      console.log('event')
    })
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
