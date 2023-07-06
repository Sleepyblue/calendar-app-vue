<template>
  <label for="" class="hour-label relative w-full">
    <input
      v-if="focus"
      ref="hourRef"
      type="number"
      :min="min || 0"
      :max="!minHour ? 23 : 24"
      :placeholder="placeholder"
      class="hour-input w-full rounded-t-md bg-slate-100 p-1 outline-none focus:bg-slate-200"
      :value="hour"
      @input="handleEmit($event)"
      @focusout="focusOut"
      required
    />
    <input
      v-else
      type="text"
      placeholder="Insert a date"
      class="text-md w-full border-b-2 border-b-transparent bg-slate-100 p-1 outline-none"
      :value="formatHour"
      @focusin="focusIn"
    />
  </label>
</template>

<script setup lang="ts">
import { ref, computed, onUpdated } from 'vue';
import {
  formatHour12,
  getCurrentHour,
  getCurrentFormattedHour,
} from '@/utils/Hours';

const { startHour, endHour, minHour } = defineProps<{
  startHour?: number;
  endHour?: number;
  minHour?: number;
}>();

const emit = defineEmits<{
  (e: 'update:startHour', value: number): void;
  (e: 'update:endHour', value: number): void;
}>();

const hourRef = ref<HTMLInputElement | null>(null);
const focus = ref(false);
const min = computed(() => {
  if (minHour) {
    return minHour + 1;
  } else if (minHour === 0 && endHour) {
    return 1;
  }
});

const hour = computed(() => {
  if (startHour) {
    return startHour;
  } else if (startHour !== undefined && startHour < 1) {
    return 0;
  } else if (endHour) {
    return endHour;
  } else return currentHour.value;
});

const placeholder = computed(() => {
  if (startHour) return `Event begins`;
  else return `Event ends`;
});

const currentHour = computed(() => {
  if (!startHour && minHour === undefined) {
    emit('update:startHour', getCurrentHour('start'));
    return getCurrentHour('start');
  } else {
    emit('update:endHour', getCurrentHour('end'));
    return getCurrentHour('end');
  }
});

const formatHour = computed(() => {
  if (hour.value || hour.value === 0) {
    return formatHour12(hour.value);
  } else if (!startHour && minHour === undefined) {
    return getCurrentFormattedHour('start');
  } else {
    return getCurrentFormattedHour('end');
  }
});

function focusIn() {
  focus.value = true;
}

function focusOut() {
  focus.value = false;
}

function handleEmit(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:startHour', +target.value);
  emit('update:endHour', +target.value);
}

onUpdated(() => {
  hourRef.value?.focus();
});

defineExpose({
  hourRef,
});
</script>

<style>
.hour-label:has(.hour-input:focus)::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  border-radius: 50px;
  background: linear-gradient(120deg, #f5788d, #f5e178, #f5788d);
  background-size: 300% 300%;
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
</style>
