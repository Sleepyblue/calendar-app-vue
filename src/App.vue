<template>
  <DefaultLayout />
</template>

<script setup lang="ts">
import DefaultLayout from '@/views/pages/DefaultLayout/DefaultLayout.vue';
import { useCalendarStore } from './stores/calendarStore';
import { getWeekDates } from './utils/Dates';

const setWeekDates = useCalendarStore().setWeekDates;
setWeekDates(getWeekDates());
</script>
