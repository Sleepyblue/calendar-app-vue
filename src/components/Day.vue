<template>
  <div
    ref="day"
    class="bg-amber-500 m-[1px] grid grid-rows-[repeat(24,_minmax(3em,_1fr))] grid-cols-1 border-t-black bg-[length:100%_48.8281px] back_gradient-grid h-full"
  >
    <slot name="hours"></slot>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.back_gradient-grid {
  background-image: linear-gradient(
    to bottom,
    black 0%,
    transparent 1px,
    transparent 100%
  );
}
</style>
