<template>
  <div class="h-full" :data-day="day">
    <CalendarHeader :shortDate="shortDayDate" :dateTime="day" />
    <div
      :id="day"
      class="calendar-day__grid relative h-full cursor-pointer grid-cols-1 grid-rows-[repeat(24,_minmax(3em,_1fr))] border-r"
      :class="{ 'border-r-0': index === 6 }"
    >
      <!-- Convert to atom -->
      <div
        v-for="(t, index) in 24"
        :data-hour="t - 1"
        class="hour__grid-area relative flex border-b"
        :class="{ 'border-b-0': index === 23, 'cursor-move': isMouseDown }"
        @click="handleModal"
        @mousedown.prevent="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
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
        :eventHour="event.hour"
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
const hour = ref(0);

// const rowStart = ref();
// const rowEnd = ref();
const isMouseDown = ref(false);
const isDragging = ref(false);
const position = ref();
const height = ref();
const changeOffset = ref(false);
const currentOffset = ref();
let initialPosition = 0;

function handleMouseDown(e: MouseEvent) {
  const target = e.target as HTMLElement;
  isMouseDown.value = true;
  position.value = target.offsetTop;
  initialPosition = position.value;
}

function handleMouseMove(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (!isMouseDown.value) return;
  isDragging.value = true;

  currentOffset.value = target.offsetTop;
  const offsetDiff = currentOffset.value - initialPosition;

  if (offsetDiff >= 0) {
    changeOffset.value = false;
    position.value = initialPosition;
    height.value = offsetDiff + 50;
  } else {
    changeOffset.value = true;
    height.value = Math.abs(offsetDiff);

    if (offsetDiff === -50) {
      const containerHeight = (target.offsetParent! as HTMLElement)
        .offsetHeight;
      position.value = containerHeight - target.offsetTop - target.offsetHeight;
    }
  }
}

function handleMouseUp(e: MouseEvent) {
  isMouseDown.value = false;
  isDragging.value = false;
  changeOffset.value = false;
}

function handleModal(e: MouseEvent) {
  showModal.value = !showModal.value;

  if (showModal.value) {
    date.value = day;
    if (!date) return;

    hour.value = +(e.target as HTMLElement).dataset.hour!;
    if (!hour.value) return;
  }
}

const events = computed(() =>
  store.weekEvents?.events.filter((event) => event.date === day)
);
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
