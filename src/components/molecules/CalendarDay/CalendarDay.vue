<template>
  <div class="h-full" :data-day="day">
    <CalendarHeader :shortDate="shortWeekDate" :dateTime="day" />
    <div
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
        @click="handleModal"
      ></div>
      <EventCard
        v-for="event in events"
        :eventTitle="event.eventName"
        :hour="event.eventHour"
        class="pointer-events-auto absolute cursor-pointer"
      />
    </div>
    <EventModal
      v-if="showModal"
      :show="showModal"
      :date="date"
      :hour="hour"
      @close="showModal = false"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import CalendarHeader from '@/components/molecules/CalendarHeader';
import EventCard from '@/components/atoms/EventCard';
import EventModal from '@/components/atoms/EventModal';
import { useCalendarStore } from '@/stores/calendarStore';
import { convertDateToShorthand } from '@/utils/Dates';
import type { DayEvent } from '@/types';

const { day } = defineProps<{
  day: string;
  index: number;
}>();

const store = useCalendarStore();
const shortWeekDate = computed(() => convertDateToShorthand(day));
const showModal = ref(false);
const date = ref('');
const hour = ref('');

function handleModal(e: MouseEvent) {
  showModal.value = !showModal.value;

  if (showModal.value) {
    date.value = day;
    if (!date) return;

    hour.value = (e.target as HTMLElement).dataset.hour!;
    if (!hour.value) return;
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
