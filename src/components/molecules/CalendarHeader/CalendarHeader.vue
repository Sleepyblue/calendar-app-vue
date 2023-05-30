<template>
  <header
    class="calendar-header sticky left-0 top-0 z-10 h-[4%] place-items-center bg-amber-700"
  >
    <time :datetime="dateTime" class="text-center text-white">
      {{ shortDate }}
    </time>
    <EventHeader
      v-for="(event, index) in eventHeaders"
      :key="index"
      :eventTitle="event.eventName + index"
      class="header-event"
    />
  </header>
</template>

<script setup lang="ts">
import { watch, computed } from 'vue';
import EventHeader from '@/components/atoms/EventHeader';
import { useCalendarStore } from '@/stores/calendarStore';

const { dateTime } = defineProps<{
  dateTime?: string;
  shortDate: string;
}>();

const store = useCalendarStore();
const eventHeaders = computed(
  () => store.events.find((event) => event.date === dateTime)?.events
);
</script>

<style>
.calendar-header {
  display: grid;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  grid-template-areas:
    'header-top'
    'header-bottom';
}

.calendar-header > time {
  grid-area: header-top;
}

.calendar-header > .header-event {
  grid-area: header-bottom;
}
</style>
