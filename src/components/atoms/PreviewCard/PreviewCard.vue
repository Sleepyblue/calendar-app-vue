<template>
  <div
    class="preview-card pc-position pointer-events-none shadow-md"
    :class="!changeOffset ? 'pc-top' : 'pc-bottom'"
  />
</template>

<script setup lang="ts">
defineProps<{
  changeOffset: boolean;
  position: number;
  height: number;
}>();
</script>

<style>
.pc-position {
  position: absolute;
  height: v-bind(height + 'px');
  width: 100%;
}

.pc-top {
  top: v-bind(position + 'px');
}

.pc-bottom {
  bottom: v-bind(position + 'px');
}

.preview-card {
  background-color: rgba(245, 162, 120, 0.15);
  border-radius: 12px;
}
</style>
