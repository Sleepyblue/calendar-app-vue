<template>
  <article
    class="event-card grid-start flex h-full w-11/12 flex-col items-start justify-start gap-1 overflow-hidden rounded-md border-2 border-l-[6px] border-slate-100 p-1 text-white shadow-md"
    :class="{ 'grid-end': eventEndHour }"
    @click="show = true"
  >
    <p
      class="w-full shrink-0 truncate whitespace-normal text-xs font-bold"
      :class="isShort ? 'whitespace-nowrap' : 'line-clamp-2'"
    >
      {{ eventTitle }}
    </p>
    <p class="text-xs font-light">
      {{ hourRange }}
    </p>
    <EventModal
      v-if="show"
      :show="show"
      :id="eventId"
      :title="eventTitle"
      :date="eventDate"
      :startHour="eventStartHour"
      :endHour="eventEndHour"
      @close="show = false"
      edit
    />
  </article>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { formatHoursRange } from '@/utils/Hours';
import EventModal from '@/components/atoms/EventModal';

const { eventStartHour, eventEndHour } = defineProps<{
  eventDate: string;
  eventId: string;
  eventTitle: string;
  eventStartHour: number;
  eventEndHour: number;
}>();

const show = ref(false);

const hourRange = computed(() =>
  formatHoursRange(eventStartHour, eventEndHour, true)
);

const isShort = computed(() =>
  eventEndHour - eventStartHour < 2 ? true : false
);
</script>

<style>
.grid-start {
  grid-row-start: v-bind('eventStartHour + 1');
}

.grid-end {
  grid-row-end: v-bind('eventEndHour + 1');
}

.event-card {
  background-color: #f5a278;
}
</style>
