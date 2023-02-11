<template>
  <div class="h-full">
    <DayHeader :date="header" :isBlank="isBlank" />
    <div
      class="group grid grid-rows-[repeat(24,_minmax(3em,_1fr))] grid-cols-1 bg-[length:100%_48.8281px] h-full border-x border-transparent"
      :class="{
        'back_gradient-grid  hover:border-x-gray-200': !isBlank,
      }"
      @click=""
    >
      <slot name="hours"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DayHeader from './DayHeader.vue';

const props = defineProps({
  header: String,
  isBlank: Boolean,
});
</script>

<style scoped>
.back_gradient-grid:hover {
  background-image: linear-gradient(
    to bottom,
    rgb(229, 231, 235) 0%,
    transparent 1px,
    transparent 100%
  );
}
</style>
