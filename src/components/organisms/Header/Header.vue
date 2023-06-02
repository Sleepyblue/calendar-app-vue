<template>
  <div id="header" class="flex items-center justify-between gap-4 px-8 py-4">
    <p class="w-40 text-3xl font-bold leading-7">{{ month }}</p>
    <div class="flex items-center gap-8">
      <Button
        icon="LeftArrow"
        class="rounded-md bg-slate-100 p-2 text-black active:translate-y-[1px]"
        @click="moveBackwards"
      />
      <Button
        icon="RightArrow"
        class="rounded-md bg-slate-100 p-2 text-black active:translate-y-[1px]"
        @click="moveForward"
      />
    </div>
    <Button
      class="rounded-lg bg-slate-100 px-6 py-2 font-bold text-black active:translate-y-[1px]"
      >Add Event</Button
    >
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/molecules/Button';
import { computed } from 'vue';
import { useCalendarStore } from '@/stores/calendarStore';
import { getCurrentDates, setCurrentDates } from '@/utils/Dates';

const store = useCalendarStore();
store.view = getCurrentDates();

// TODO: Rework this as an external snippet
let month = computed(() => {
  const getWeekStart = new Date(store.view[0]).toDateString();
  let shortMonth = getWeekStart.slice(4, 7);
  let year = getWeekStart.slice(-4);
  return `${shortMonth}' ${year}`;
});

function moveForward() {
  store.view = setCurrentDates(store.view, true);
}

function moveBackwards() {
  store.view = setCurrentDates(store.view, false);
}
</script>
