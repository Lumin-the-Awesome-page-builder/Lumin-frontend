<template>
  <div>
    <div
      class="cursor"
      :style="{ left: `${coordinates.x}px`, top: `${coordinates.y}px` }"
    ></div>
    <div
      class="user-id"
      :style="{ left: `${coordinates.x + 15}px`, top: `${coordinates.y}px` }"
    >
      {{ userId }}
    </div>
  </div>
</template>

<script>
import useCursorStore from "@/store/cursor.store";

export default {
  name: 'Cursor',
  props: {
    userId: Number,
  },
  computed: {
    coordinates() {
      return this.cursorStore.getCursors[this.userId]
    }
  },
  setup() {
    return {
      cursorStore: useCursorStore()
    };
  },
};
</script>

<style scoped>
.cursor {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: rgba(255, 0, 0, 0.7);
  border-radius: 50%;
  pointer-events: none;
  //transition: left 0.2s ease, top 0.2s ease;
}
.user-id {
  position: absolute;
}
</style>
