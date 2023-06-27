<template>
  <article
    class="event-card flex w-11/12 flex-col items-start justify-start gap-1 rounded-md px-2 py-1 text-white"
    :class="{ 'grid-end': eventEndHour }"
    @click="$emit('openEventDisplay', $event)"
  >
    <p
      class="pointer-events-none w-full shrink-0 truncate whitespace-normal text-xs font-bold"
      :class="isShort ? 'whitespace-nowrap' : 'line-clamp-2'"
    >
      {{ eventTitle }}
    </p>
    <p class="pointer-events-none text-xs font-light">
      {{ hourRange }}
    </p>
  </article>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { formatHoursRange } from '@/utils/Hours';

const { eventStartHour, eventEndHour } = defineProps<{
  eventDate: string;
  eventId: string;
  eventTitle: string;
  eventStartHour: number;
  eventEndHour: number;
}>();

const startHourFix = computed(() => eventStartHour + 1);
const endHourFix = computed(() => eventEndHour + 1);

const hourRange = computed(() =>
  formatHoursRange(eventStartHour, eventEndHour, true)
);

const isShort = computed(() =>
  eventEndHour - eventStartHour < 2 ? true : false
);
</script>

<style>
.event-card {
  height: calc(100% - 2px);
  background-color: #f5a278;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
  grid-row-start: v-bind('startHourFix');
}

.grid-end {
  grid-row-end: v-bind('endHourFix');
}
</style>
