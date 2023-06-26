<template>
  <div
    id="event-display"
    class="absolute h-96 w-64 rounded-md bg-slate-100"
    :class="[
      { 'card-translateX': horizontalPosition === 'right' },
      { 'card-translateY': translate },
      { 'card-translate': horizontalPosition === 'right' && translate },
    ]"
  >
    <Button
      icon="Close"
      class="absolute right-1 top-1 text-[#f5a278]"
      @click.prevent="closeDisplay"
    />
  </div>
  <!-- <EventModal
      v-if="show"
      :show="show"
      :id="eventId"
      :title="eventTitle"
      :date="eventDate"
      :startHour="eventStartHour"
      :endHour="eventEndHour"
      @close="show = false"
      edit
    /> -->
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Button from '@/components/molecules/Button';
import EventModal from '@/components/atoms/EventModal';

const { offsetTop, offsetLeft, offsetWidth, horizontalPosition, translate } =
  defineProps<{
    offsetTop: number;
    offsetLeft: number;
    offsetWidth: number;
    horizontalPosition: string;
    translate: boolean;
  }>();

const emit = defineEmits<{
  (e: 'close', show: boolean): void;
}>();

const offsetSum = computed(() => {
  if (horizontalPosition === 'left') return offsetLeft + offsetWidth;
  else return offsetLeft;
});

const refinedOffsetTop = computed(() => offsetTop - 12);

function closeDisplay() {
  emit('close', true);
}
</script>

<style scoped>
#event-display {
  top: v-bind(refinedOffsetTop + 'px');
  left: v-bind(offsetSum + 'px');
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  /* transform: translateX(v-bind(translateX), v-bind(translateY)); */
}

.card-translateX {
  transform: translateX(-108%);
}
.card-translateY {
  transform: translateY(-100%);
}

.card-translate {
  transform: translate(-108%, -100%);
}
</style>
