<template>
  <div
    id="calendar"
    class="grid grid-cols-8 overflow-x-hidden overflow-y-scroll"
  >
    <CalendarHours class="z-0" />
    <CalendarDay
      class="z-0"
      v-for="(day, index) in weekDates"
      :key="day"
      :day="day"
      :index="index"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import CalendarDay from '@/components/molecules/CalendarDay';
import CalendarHours from '@/components/atoms/CalendarHours';
import { useCalendarStore } from '@/stores/calendarStore';
import { convertWeekDatesToStrings } from '@/utils/Dates';

const store = useCalendarStore();
const weekDates = computed(() => convertWeekDatesToStrings(store.view));
console.log(weekDates.value);
</script>

<style>
#calendar::-webkit-scrollbar {
  width: 18px;
  background-color: theme('backgroundColor.slate.200');
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

#calendar::-webkit-scrollbar-thumb {
  background: linear-gradient(
    45deg,
    #f5a278 20%,
    #f9c7ae 20%,
    #f9c7ae 40%,
    #f5a278 40%,
    #f5a278 60%,
    #f9c7ae 60%,
    #f9c7ae 80%,
    #f5a278 80%
  );
  border-radius: 50px;
  border: 6px solid theme('borderColor.slate.200');
}
</style>
