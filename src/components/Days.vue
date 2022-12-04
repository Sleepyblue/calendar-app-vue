<template>
  <div v-for="(days, index) in weekView" class="min-h-fit">
    <DayHeader :date="readableWeekDate[index]" class="z-10" />
    <Day class="z-0" />
  </div>
</template>

<script lang="ts" setup>
import Day from './Day.vue';
import DayHeader from '../components/DayHeader.vue';
import {
  getCurrentWeekDates,
  convertToReadableWeekDates,
} from './../components/utils';

const currentWeek = getCurrentWeekDates();
const readableWeekDate = convertToReadableWeekDates(currentWeek);

const weekView = getCurrentWeekDates();
</script>
