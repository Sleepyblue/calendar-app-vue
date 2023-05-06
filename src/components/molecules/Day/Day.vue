<template>
  <div class="h-full" :data-day="day">
    <DayHeader :date="header" />
    <div
      class="calendar-day__grid relative h-full cursor-pointer grid-cols-1 grid-rows-[repeat(24,_minmax(3em,_1fr))] first:border-l"
      :id="day"
      ref="dayRef"
    >
      <!-- Convert to atom -->
      <div
        v-for="t in 24"
        class="hour__grid-area relative border-b border-r border-white hover:bg-amber-100"
        :data-hour="t"
        @click="eventClick"
      ></div>
      <EventCard
        v-for="event in events"
        :event="event.eventName"
        :hour="event.eventHour"
        class="pointer-events-auto absolute cursor-pointer"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import DayHeader from '@/components/atoms/DayHeader';
import EventCard from '@/components/atoms/EventCard';
import { useCalendarStore } from '@/stores/calendarStore';
import { computed, ref } from 'vue';

const props = defineProps({
  day: String,
  header: String,
});

const store = useCalendarStore();
const dayRef = ref(null);

function eventClick(e) {
  const dayId = dayRef.value?.id;
  if (!dayId) return;

  const hour = e.target.dataset.hour;
  if (!hour) return;

  // create interface
  let eventObject = {
    date: '',
    events: [],
  };

  eventObject.date = dayId;
  eventObject.events.push({
    eventName: 'Event-Test',
    eventHour: hour,
  });

  store.events.push(eventObject);
}

const events = computed(() => {
  // Need the type
  let events: any[] = [];
  store.events.forEach((item) => {
    if (props.day === item.date)
      item.events.forEach((event) => events.push(event));
  });

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
