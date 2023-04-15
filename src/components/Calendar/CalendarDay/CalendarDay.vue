<template>
  <div class="h-full" :data-day="day">
    <DayHeader :date="header" />
    <div
      class="calendar-day__grid relative h-full cursor-pointer grid-cols-1 grid-rows-[repeat(24,_minmax(3em,_1fr))] first:border-l"
      :id="day"
      @click="eventClick"
    >
      <div
        v-for="t in 24"
        class="hour__grid-area border-b border-r border-slate-300 hover:bg-amber-100 active:pointer-events-none"
      ></div>
      <div
        class="pointer-events-none absolute flex h-full w-full flex-col gap-1"
      >
        <EventCard
          v-for="event in events"
          :event="event"
          class="event__grid-area pointer-events-auto cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DayHeader from '@/components/Calendar/Headers/DayHeader';
import EventCard from '@/components/Events/EventCard';
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

  console.log('🍁🍁🍁 CALLED');

  store.events.push(eventObject);
}

const events = computed(() => {
  let events: string[] = [];
  store.events.forEach((item) => {
    if (props.day === item.date)
      item.events.forEach((event) => events.push(event.eventName));
  });

  console.log('🌼🌼🌼', events);
  return events;
});
</script>

<style>
.calendar-day__grid {
  display: grid;
  grid-template-areas: 'day';
}

.event__grid-area {
  grid-row: 1/-1;
  grid-area: 'day';
}

.hour__grid-area {
  grid-area: 'day';
}
</style>
