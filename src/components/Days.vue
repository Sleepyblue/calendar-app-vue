<template>
  <Day v-for="days in weekView" />
</template>

<script lang="ts" setup>
import Day from './Day.vue';
import { getCurrentWeekDates } from './utils';

const weekView = getCurrentWeekDates();
</script>
