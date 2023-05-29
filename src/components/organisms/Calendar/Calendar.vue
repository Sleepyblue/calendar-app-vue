<template>
  <div
    id="calendar"
    class="relative col-start-3 col-end-[12] row-start-3 row-end-[12] grid grid-cols-8 overflow-x-hidden overflow-y-scroll"
  >
    <CalendarHours class="z-0" />
    <CalendarDay
      class="z-0"
      v-for="(day, index) in weekDates"
      :key="day"
      :day="day"
      :header="shortWeekDates[index]"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import CalendarDay from '@/components/molecules/CalendarDay';
import CalendarHours from '@/components/atoms/CalendarHours';
import { useCalendarStore } from '@/stores/calendarStore';
import { convertToStringDates } from '@/utils/Dates';

const store = useCalendarStore();

const weekDates = computed(() => convertToStringDates(store.view, true));
const shortWeekDates = computed(() =>
  convertToStringDates(store.view, false, true)
);
</script>

<style>
#calendar::-webkit-scrollbar {
  width: 6px;
  background-color: transparent;
}

#calendar::-webkit-scrollbar-thumb {
  background-color: rgb(229, 231, 235);
  border-radius: 50px;
}
</style>
