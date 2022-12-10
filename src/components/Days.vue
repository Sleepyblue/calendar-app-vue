<template>
  <div
    class="row-start-3 row-end-[12] bg-blue-500 col-start-3 col-end-[12] grid-cols-8 grid overflow-y-scroll overflow-x-hidden relative"
  >
    <div class="h-full">
      <DayHeader class="z-10" />
      <Day class="z-0">
        <template #hours>
          <Hours v-for="(hour, index) in hours" :hour="index + 1" />
        </template>
      </Day>
    </div>
    <div v-for="(days, index) in weekView">
      <DayHeader :date="readableWeekDate[index]" class="z-10" />
      <Day class="z-0" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Day from './Day.vue';
import DayHeader from '../components/DayHeader.vue';
import Hours from './Hours.vue';
import {
  getCurrentWeekDates,
  convertToReadableWeekDates,
} from './../components/utils';

const currentWeek = getCurrentWeekDates();
const readableWeekDate = convertToReadableWeekDates(currentWeek);

const hours = 23;
const weekView = getCurrentWeekDates();
</script>
