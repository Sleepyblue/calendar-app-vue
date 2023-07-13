<template>
  <InputTemplate
    label="date"
    iconName="Calendar"
    :error="error"
    errorMessage="Invalid date"
    :focusRef="dateRef"
  >
    <input
      v-if="focus"
      ref="dateRef"
      type="date"
      name="date"
      placeholder="Insert a date"
      class="text-md w-full rounded-t-md bg-transparent p-1 outline-none focus:bg-slate-200"
      :value="date"
      @input="handleEmit($event)"
      @change="isFieldValid(date)"
      @focusout="focusOut"
      required
    />
    <input
      v-else
      type="text"
      placeholder="Insert a date"
      class="text-md w-full border-b-2 border-b-transparent bg-transparent p-1 outline-none rounded-t-md"
      :value="convertDateToShortForm(date)"
      @focusin="focusIn"
    />
  </InputTemplate>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputTemplate from '@/components/templates/InputTemplate';
import { convertDateToShortForm } from '@/utils/Dates';

const { date } = defineProps<{
  date: string;
}>();

const emit = defineEmits<{
  (e: 'update:date', value: string): void;
  (e: 'invalidField', value: { date: boolean }): void;
}>();

const focus = ref(false);
const error = ref(false);
const dateRef = ref<HTMLInputElement | null>(null);

function isFieldValid(date: string) {
  const toDate = new Date(date);

  if (isNaN(toDate.getTime())) {
    error.value = true;
  } else {
    error.value = false;
  }

  emit('invalidField', { date: error.value });
}

function handleEmit(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:date', target.value);
}

function focusIn() {
  focus.value = true;
}

function focusOut() {
  focus.value = false;
}
</script>
