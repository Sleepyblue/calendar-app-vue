<template>
  <InputTemplate
    label="date"
    :error="error"
    errorMessage="Enter a value from 0 to 24"
    :focusRef="hourRef"
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
  </InputTemplate>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import InputTemplate from '@/components/templates/InputTemplate';
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
  (e: 'invalidField', value: { startHour: boolean }): void;
  (e: 'invalidField', value: { endHour: boolean }): void;
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

  if (startHour) {
    emit('invalidField', { startHour: error.value });
  }

  if (endHour) {
    emit('invalidField', { endHour: error.value });
  }
}

function handleEmit(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:startHour', +target.value);
  emit('update:endHour', +target.value);
}
</script>
