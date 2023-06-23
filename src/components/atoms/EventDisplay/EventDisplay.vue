<template>
  <div
    id="event-display"
    class="absolute h-96 w-64 rounded-md bg-slate-100"
    :class="{ 'card-right': position === 'right' }"
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

const { offsetTop, offsetLeft, offsetWidth, position } = defineProps<{
  offsetTop: number;
  position: string;
  offsetLeft: number;
  offsetWidth: number;
}>();

const emit = defineEmits<{
  (e: 'close', show: boolean): void;
}>();

const offsetSum = computed(() => {
  if (position === 'left') return offsetLeft + offsetWidth;
  else return offsetLeft;
});

const refinedOffsetTop = computed(() => offsetTop - Math.round(offsetTop / 3));

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
}

.card-right {
  transform: translateX(-108%);
}
</style>
