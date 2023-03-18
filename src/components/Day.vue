<template>
  <div class="h-full" :data-day="day">
    <DayHeader :date="header" :isBlank="isBlank" />
    <div
      class="group grid h-full cursor-pointer grid-cols-1 grid-rows-[repeat(24,_minmax(3em,_1fr))] border-x border-transparent bg-[length:100%_48.8281px]"
      :class="{
        'back_gradient-grid  hover:border-x-gray-200': !isBlank,
      }"
      :id="day"
      @click="eventClick"
    >
      <slot name="hours"></slot>
      <div
        v-for="event in events"
        v-if="!isBlank"
        class="mx-auto my-0 h-10 w-11/12 rounded-md border-l-8 border-l-amber-300 text-sm text-black shadow-md"
      >
        {{ event }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DayHeader from './DayHeader.vue';
import { computed } from 'vue';
import { useCalendarStore } from '@/stores/calendarStore';

const props = defineProps({
  day: String,
  header: String,
  isBlank: Boolean,
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
