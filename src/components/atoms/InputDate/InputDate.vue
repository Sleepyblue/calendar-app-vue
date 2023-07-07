<template>
  <label
    for=""
    class="relative flex items-center justify-start gap-2"
    :class="{ 'mb-2 border-[3px] border-[#f5788d] rounded-lg pl-1': error }"
  >
    <IconLoader name="Calendar" :size="18" class="shrink-0 text-gray-400" />
    <input
      v-if="focus"
      ref="dateRef"
      type="date"
      placeholder="Insert a date"
      class="date-input tex-md relative w-full rounded-t-md bg-slate-100 p-1 outline-none focus:bg-slate-200"
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
      class="text-md w-full border-b-2 border-b-transparent bg-slate-100 p-1 outline-none rounded-t-md"
      :value="convertDateToShortForm(date)"
      @focusin="focusIn"
    />
    <p v-if="error" class="absolute -bottom-5 left-0 text-xs text-[#f5788d]">
      Invalid date
    </p>
  </label>
</template>

<script setup lang="ts">
import { onUpdated, ref } from 'vue';
import IconLoader from '@/components/atoms/IconLoader';
import { convertDateToShortForm } from '@/utils/Dates';

const { date } = defineProps<{
  date: string;
}>();

const emit = defineEmits<{
  (e: 'update:date', value: string): void;
  (e: 'invalidField', value: boolean): void;
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

  emit('invalidField', error.value);
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

onUpdated(() => {
  dateRef.value?.focus();
});
</script>

<style>
.date-input:focus::before {
  content: '';
  position: absolute;
  bottom: 0px;
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
