<template>
  <div v-for="(days, index) in weekDates">
    <DayHeader :date="readableWeekDates[index]" class="z-10" />
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

const weekDates = getCurrentWeekDates();
const readableWeekDates = convertToReadableWeekDates(weekDates, true);
</script>
