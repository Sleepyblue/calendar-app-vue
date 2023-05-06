<template>
  <div
    class="grid h-full w-full grid-cols-12 grid-rows-[repeat(12,minmax(0,1fr))] overflow-hidden"
  >
    <Sidebar />
    <!-- Provisory -->
    <div
      class="col-start-4 col-end-12 row-span-2 flex flex-col items-start justify-center gap-4"
    >
      <div class="flex items-end gap-4 text-white">
        <p class="text-3xl font-bold leading-7">{{ month }}</p>
        <div class="flex items-center gap-2">
          <Button
            icon="LeftArrow"
            class="rounded-full bg-white p-1 text-black shadow-md hover:bg-gray-200 active:translate-y-[1px] active:bg-amber-400 active:shadow-sm"
            @click="moveBackwards"
          />

          <div class="text-white">
            <IconLoader name="Dot" />
          </div>
          <Button
            icon="RightArrow"
            class="rounded-full bg-white p-1 text-black shadow-md hover:bg-gray-200 active:translate-y-[1px] active:bg-amber-400 active:shadow-sm"
            @click="moveForward"
          />
        </div>
      </div>
      <div class="flex w-full items-center justify-between text-white">
        <p class="w-2/5 text-xs">
          Here are all your planned events. You will find information for each
          event and can plan a new one as well
        </p>
        <Button
          class="rounded-lg bg-white px-6 py-2 font-bold text-black shadow-md hover:bg-gray-200 active:translate-y-[1px] active:bg-amber-400 active:shadow-sm"
          >Add Event</Button
        >
      </div>
    </div>
    <!-- Provisory -->
    <Calendar />
  </div>
</template>

<script lang="ts" setup>
import Calendar from '@/components/organisms/Calendar';
import Sidebar from '@/components/organisms/Sidebar';
import Button from '@/components/molecules/Button';
import IconLoader from '@/components/atoms/IconLoader';
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
