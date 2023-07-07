<template>
  <article
    ref="eventCard"
    tabindex="-1"
    class="event-card flex w-11/12 flex-col items-start justify-start gap-1 rounded-md px-2 py-1 text-white"
    :class="{ 'grid-end': eventEndHour }"
    :data-id="eventId"
    @click="handleEventCardClick($event)"
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
import { computed, ref } from 'vue';
import { formatHoursRange } from '@/utils/Hours';

const { eventStartHour, eventEndHour } = defineProps<{
  eventDate: string;
  eventId: string;
  eventTitle: string;
  eventStartHour: number;
  eventEndHour: number;
}>();

const emit = defineEmits<{
  (e: 'openEventDisplay', event: MouseEvent): void;
}>();

const eventCard = ref<HTMLElement | null>(null);

const startHourFix = computed(() => eventStartHour + 1);
const endHourFix = computed(() => eventEndHour + 1);

const hourRange = computed(() =>
  formatHoursRange(eventStartHour, eventEndHour, true),
);

const isShort = computed(() =>
  eventEndHour - eventStartHour < 2 ? true : false,
);

function handleEventCardClick(e: MouseEvent) {
  emit('openEventDisplay', e);
  if (eventCard.value) eventCard.value.focus();
}
</script>

<style>
.event-card {
  height: calc(100% - 2px);
  background-color: #f5a278;
  background-color: #f6ab86;
  grid-row-start: v-bind('startHourFix');
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
}

.event-card:focus {
  box-shadow: none;
  border: 1px solid #f5e178;
  outline: none;
}

.event-card:focus::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(100% + 8px);
  height: calc(100% + 8px);
  transform: translate(-50%, -50%);
  border-radius: 8px;
  background: linear-gradient(120deg, #f5788d, #f5e178, #f5788d);
  background-size: 300% 300%;
  z-index: -1;
  animation: gradient-animation 4s ease-in-out infinite;
}

@keyframes gradient-animation {
  0% {
    background-position: 15% 0%;
  }
  50% {
    background-position: 85% 100%;
  }
  100% {
    background-position: 15% 0%;
  }
}

.grid-end {
  grid-row-end: v-bind('endHourFix');
}
</style>
