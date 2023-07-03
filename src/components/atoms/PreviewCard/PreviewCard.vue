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
  border: 2px solid #f5e178;
  border-radius: 12px;
  background: linear-gradient(
    120deg,
    rgba(245, 120, 141, 0.2),
    rgba(245, 225, 120, 0.2),
    rgba(245, 120, 141, 0.2)
  );
  background-size: 300% 300%;
  animation: gradient-animation 4s ease-in-out infinite;
}

@keyframes gradient-animation {
  0% {
    background-position: 15% 0%;
  }
  50% {
    background-position: 85% 100%;
  }
  100% {
    background-position: 15% 0%;
  }
}
</style>
