<template>
  <div class="h-full" :data-day="day">
    <CalendarHeader :shortDate="shortWeekDate" :dateTime="day" />
    <div
      ref="dayRef"
      :id="day"
      class="calendar-day__grid relative h-full cursor-pointer grid-cols-1 grid-rows-[repeat(24,_minmax(3em,_1fr))] border-r"
      :class="{ 'border-r-0': index === 6 }"
    >
      <!-- Convert to atom -->
      <div
        v-for="(t, index) in 24"
        :data-hour="t"
        class="hour__grid-area relative flex border-b"
        :class="{ 'border-b-0': index === 23 }"
        @click="eventClick"
      ></div>
      <EventCard
        v-for="event in events"
        :eventTitle="event.eventName"
        :hour="event.eventHour"
        class="pointer-events-auto absolute cursor-pointer"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import CalendarHeader from '@/components/molecules/CalendarHeader';
import EventCard from '@/components/atoms/EventCard';
import { useCalendarStore } from '@/stores/calendarStore';
import { convertDateToShorthand } from '@/utils/Dates';
import type { CalendarEvent, DayEvent } from '@/types';

const { day } = defineProps<{
  day: string;
  index: number;
}>();

const store = useCalendarStore();
const dayRef = ref<HTMLElement | null>(null);

const shortWeekDate = computed(() => convertDateToShorthand(day));

function eventClick(e: MouseEvent) {
  const dayId = dayRef.value?.id;
  if (!dayId) return;

  const hour = (e.target as HTMLElement).dataset.hour;
  if (!hour) return;

  const existingEvent = store.events.find((event) => event.date === dayId);

  if (existingEvent) {
    existingEvent.events?.push({
      eventName: 'Event-Test',
      eventHour: hour,
    });
  } else {
    const eventObject: CalendarEvent = {
      date: dayId,
      events: [
        {
          eventName: 'Event-Test',
          eventHour: hour,
        },
      ],
    };

    store.events.push(eventObject);
  }
}

const events = computed(() => {
  let events: DayEvent[] = [];
  store.events.forEach((item) => {
    if (day === item.date) item.events?.forEach((event) => events.push(event));
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

.hour__grid-area:hover {
  background-color: rgba(245, 162, 120, 0.4);
}
</style>
