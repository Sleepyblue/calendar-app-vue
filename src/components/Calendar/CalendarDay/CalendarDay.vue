<template>
  <div class="h-full" :data-day="day">
    <DayHeader :date="header" />
    <div
      class="grid h-full cursor-pointer grid-cols-1 grid-rows-[repeat(24,_minmax(3em,_1fr))] first:border-l"
      :id="day"
      @click="eventClick"
    >
      <div
        v-for="event in events"
        class="mx-auto my-0 h-10 w-11/12 rounded-md border-l-8 border-l-amber-300 text-sm text-black shadow-md"
      >
        {{ event }}
      </div>
      <div
        v-for="t in 24"
        class="box-content border-r border-b border-slate-300 hover:bg-amber-100"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DayHeader from "@cl/components/Calendar/Headers/DayHeader";
import { useCalendarStore } from '@/stores/calendarStore';
import { computed } from 'vue';

const props = defineProps({
  day: String,
  header: String,
});

const store = useCalendarStore();

function eventClick(e) {
  // create interface
  let eventObject = {
    date: '',
    events: [],
  };

  eventObject.date = e?.target.id;
  eventObject.events.push({ eventName: 'Event-Test' });
  store.events.push(eventObject);
}

const events = computed(() => {
  let events: string[] = [];
  store.events.forEach((item) => {
    if (props.day === item.date)
      item.events.forEach((event) => events.push(event.eventName));
  });

  return events;
});
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
