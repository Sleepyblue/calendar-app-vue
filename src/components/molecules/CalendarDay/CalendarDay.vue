<template>
  <div class="h-full" :data-day="day">
    <CalendarHeader :shortDate="shortDayDate" :dateTime="day" />
    <div
      :id="day"
      class="calendar-day relative h-full cursor-pointer grid-cols-1 grid-rows-[repeat(24,_minmax(3em,_1fr))] border-r"
      :class="{ 'border-r-0': index === 6 }"
    >
      <!-- Convert to atom -->
      <time
        v-for="(t, index) in 24"
        :data-hour="t"
        class="day-hour relative flex border-b"
        :class="{ 'border-b-0': index === 23, 'cursor-move': isMouseDown }"
        @click="handleModal"
        @mousedown.prevent="handleMouseDown"
        @mousemove.self="handleMouseMove"
        @mouseup.stop="handleMouseUp"
      />
      <PreviewCard
        v-if="isDragging && isMouseDown"
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
        @openEventDisplay="$emit('openEventDisplay', $event)"
      />
    </div>
    <EventModal
      v-if="showModal"
      :show="showModal"
      :date="date"
      :startHour="startHour"
      :endHour="endHour"
      @close="showModal = false"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import CalendarHeader from '@/components/molecules/CalendarHeader';
import EventCard from '@/components/atoms/EventCard';
import PreviewCard from '@/components/atoms/PreviewCard';
import EventModal from '@/components/atoms/EventModal';
import { useCalendarStore } from '@/stores/calendarStore';
import { convertDateToShorthand } from '@/utils/Dates';

const { day } = defineProps<{
  day: string;
  index: number;
}>();

const store = useCalendarStore();
const shortDayDate = computed(() => convertDateToShorthand(day));
const showModal = ref(false);
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

function handleModal(e: MouseEvent) {
  showModal.value = true;

  if (showModal.value) {
    date.value = day;
    if (!date) return;

    startHour.value = +(e.target as HTMLElement).dataset.hour!;
    if (!startHour.value) return;

    endHour.value = 0;
    if (!endHour.value) return;
  }
}

function handleMouseDown(e: MouseEvent) {
  const target = e.target as HTMLElement;
  isMouseDown.value = true;
  position.value = target.offsetTop;
  initialPosition = position.value;
  startHour.value = +target.dataset.hour! - 1;
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
    height.value = offsetDiff + 50;
  } else {
    changeOffset.value = true;
    height.value = Math.abs(offsetDiff) + target.offsetHeight;

    if (offsetDiff === -50) {
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

  showModal.value = true;
}

const events = computed(() =>
  store.weekEvents?.events.filter((event) => event.date === day)
);
</script>

<style>
.calendar-day {
  display: grid;
}

.day-hour:hover {
  background-color: rgba(245, 162, 120, 0.4);
}
</style>
