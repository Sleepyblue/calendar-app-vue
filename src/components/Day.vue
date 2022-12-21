<template>
  <div class="h-full">
    <DayHeader
      :date="readableWeekDates[index!]"
      class="z-10"
      :isBlank="isBlank"
    />
    <div
      class="m-[1px] grid grid-rows-[repeat(24,_minmax(3em,_1fr))] grid-cols-1 bg-[length:100%_48.8281px] h-full"
      :class="{ 'back_gradient-grid': !isBlank }"
    >
      <slot name="hours"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DayHeader from './DayHeader.vue';
import { convertToReadableWeekDates, getCurrentWeekDates } from './utils';

const props = defineProps({
  index: Number,
  isBlank: Boolean,
});

const weekDates = getCurrentWeekDates();
const readableWeekDates = convertToReadableWeekDates(weekDates, true);
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
