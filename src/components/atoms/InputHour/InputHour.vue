<template>
  <label
    for=""
    class="hour-label relative w-full"
    :class="{ 'mb-2 border-[3px] border-[#f5788d] rounded-lg pl-1': error }"
  >
    <input
      v-if="focus"
      ref="hourRef"
      type="number"
      :min="min || 0"
      :max="!minHour ? 23 : 24"
      :placeholder="placeholder"
      class="hour-input w-full rounded-t-md p-1 outline-none focus:bg-slate-200 bg-transparent"
      :value="hour"
      @input="handleEmit($event)"
      @change="isFieldValid(hour)"
      @focusout="focusOut"
      required
    />
    <input
      v-else
      type="text"
      placeholder="Insert a date"
      class="text-md w-full border-b-2 border-b-transparent bg-transparent p-1 outline-none rounded-t-md"
      :value="formatHour"
      @focusin="focusIn"
    />
    <p v-if="error" class="absolute -bottom-5 left-0 text-xs text-[#f5788d]">
      Enter a value from 0 to 24
    </p>
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
  (e: 'invalidField', value: boolean): void;
}>();

const hourRef = ref<HTMLInputElement | null>(null);
const focus = ref(false);
const error = ref(false);

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
  if (error.value) return 'Invalid Hour';

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

function isFieldValid(hour: number) {
  if (hour <= 0 || hour >= 24) {
    error.value = true;
  } else {
    error.value = false;
  }

  emit('invalidField', error.value);
}

function handleEmit(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:startHour', +target.value);
  emit('update:endHour', +target.value);
}

onUpdated(() => {
  hourRef.value?.focus();
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

.hour-label:has(.hour-input:focus + p)::before {
  content: none;
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

label > input:hover {
  cursor: pointer;
  background-color: rgba(245, 162, 120, 0.1);
}
</style>
