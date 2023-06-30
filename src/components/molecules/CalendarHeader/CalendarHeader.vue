<template>
  <header class="calendar-header place-items-center">
    <time :datetime="dateTime" class="text-center text-black">
      {{ shortDate }}
    </time>
    <!-- <EventHeader
      v-for="(event, index) in eventHeaders"
      :key="index"
      :eventTitle="event.eventName + index"
      class="header-event"
    /> -->
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import EventHeader from '@/components/atoms/EventHeader';
import { useCalendarStore } from '@/stores/calendarStore';

const { dateTime } = defineProps<{
  dateTime?: string;
  shortDate: string;
}>();

const store = useCalendarStore();
// const eventHeaders = computed(
//   () => store.events.find((event) => event.date === dateTime)?.events
// );
</script>

<style>
.calendar-header {
  display: grid;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  grid-template-areas:
    'header-top'
    'header-bottom';
  /* -webkit-box-shadow: 0 8px 6px -6px black; */
  /* -moz-box-shadow: 0 8px 6px -6px black; */
  box-shadow: 0 2px 1px -2px black;
}

.calendar-header > time {
  grid-area: header-top;
}

.calendar-header > .header-event {
  grid-area: header-bottom;
}
</style>
