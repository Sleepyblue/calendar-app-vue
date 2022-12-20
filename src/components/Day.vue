<template>
  <div
    class="m-[1px] grid grid-rows-[repeat(24,_minmax(3em,_1fr))] grid-cols-1 bg-[length:100%_48.8281px] h-full"
    :class="{ 'back_gradient-grid': !isBlank }"
  >
    <slot name="hours"></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  isBlank: Boolean,
});
</script>

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
