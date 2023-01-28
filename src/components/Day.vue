<template>
  <div class="h-full">
    <DayHeader :date="readableWeekDates[index!]" :isBlank="isBlank" />
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
import {
  convertToReadableWeekDates,
  getCurrentDates,
  setDateInterval,
} from './utils';

const props = defineProps({
  index: Number,
  isBlank: Boolean,
});

let weekDates = [];
weekDates = getCurrentDates(7, true);

const readableWeekDates = convertToReadableWeekDates(
  weekDates as string[],
  true
);
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
