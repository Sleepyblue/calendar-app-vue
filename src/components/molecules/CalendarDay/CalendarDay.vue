<template>
  <div class="day-z h-full" :data-day="day">
    <div
      :id="day"
      class="calendar-day relative z-[-1] h-full cursor-pointer grid-cols-1 grid-rows-[repeat(24,_minmax(3em,_1fr))] border-r"
      :class="{ 'border-r-0': index === 6 }"
    >
      <!-- Convert to atom -->
      <time
        v-for="(t, index) in 24"
        :data-hour="t"
        class="relative z-[-1] flex border-b"
        :class="{
          'border-b-0': index === 23,
          'cursor-move': isMouseDown,
          'day-hour': !isDragging && !isMouseDown,
        }"
        @click="emitOpenModal($event, startHour, endHour)"
        @mousedown.prevent="handleMouseDown"
        @mousemove.self="handleMouseMove"
        @mouseup.stop="handleMouseUp"
      />
      <PreviewCard
        v-if="isDragging || isMouseDown"
        :changeOffset="changeOffset"
        :position="position"
        :height="height"
      />
      <EventCard
        v-for="event in events"
        :eventDate="day"
        :eventId="event.id"
        :eventTitle="event.title"
        :eventStartHour="event.startHour"
        :eventEndHour="event.endHour"
        class="pointer-events-auto absolute cursor-pointer"
        @openEventDisplay="emitOpenDisplay($event)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import EventCard from '@/components/atoms/EventCard';
import PreviewCard from '@/components/atoms/PreviewCard';
import { useCalendarStore } from '@/stores/calendarStore';

const { day } = defineProps<{
  day: string;
  index: number;
}>();

interface modalEmit {
  event: MouseEvent;
  startHour: number;
  endHour: number;
}

const emit = defineEmits<{
  (e: 'openEventDisplay', event: MouseEvent): void;
  (e: 'openEventModal', value: modalEmit): void;
}>();

const store = useCalendarStore();
const date = ref('');
const startHour = ref(0);
const endHour = ref(0);

const isMouseDown = ref(false);
const isDragging = ref(false);
const position = ref();
const height = ref();
const changeOffset = ref(false);
const currentOffset = ref();
let initialPosition = 0;
let offsetDiff = 0;

function emitOpenModal(e: MouseEvent, startHour: number, endHour: number) {
  emit('openEventModal', {
    event: e,
    startHour: startHour,
    endHour: endHour,
  });
}

function emitOpenDisplay(e: MouseEvent) {
  emit('openEventDisplay', e);
}

function handleMouseDown(e: MouseEvent) {
  const target = e.target as HTMLElement;
  isMouseDown.value = true;
  position.value = target.offsetTop;
  initialPosition = position.value;
  startHour.value = +target.dataset.hour! - 1;
  height.value = 49;
}

function handleMouseMove(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (!isMouseDown.value) return;
  isDragging.value = true;

  currentOffset.value = target.offsetTop;
  offsetDiff = currentOffset.value - initialPosition;

  if (offsetDiff >= 0) {
    changeOffset.value = false;
    position.value = initialPosition;
    height.value = offsetDiff + 49;
  } else {
    changeOffset.value = true;
    height.value = Math.abs(offsetDiff) + target.offsetHeight;

    if (offsetDiff === -49 || offsetDiff === -48) {
      const containerHeight =
        (target.offsetParent! as HTMLElement).offsetHeight -
        target.offsetHeight;
      position.value = containerHeight - target.offsetTop - target.offsetHeight;
    }
  }
}

function handleMouseUp(e: MouseEvent) {
  const target = e.target as HTMLElement;
  isMouseDown.value = false;
  isDragging.value = false;
  changeOffset.value = false;

  date.value = day;
  if (offsetDiff >= 0) {
    endHour.value = +target.dataset.hour!;
  } else {
    endHour.value = startHour.value + 1;
    startHour.value = +target.dataset.hour! - 1;
  }

  emitOpenModal(e, startHour.value, endHour.value);
}

const events = computed(() =>
  store.weekEvents?.events.filter((event) => event.date === day)
);
</script>

<style>
.calendar-day {
  display: grid;
}

.day-z {
  z-index: 0;
}

.day-hour:hover {
  background-color: rgba(245, 162, 120, 0.4);
}
</style>
