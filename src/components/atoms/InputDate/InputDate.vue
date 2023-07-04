<template>
  <label for="" class="flex items-center justify-start gap-2">
    <IconLoader name="Calendar" :size="18" class="shrink-0 text-gray-400" />
    <input
      v-if="focus"
      ref="dateInput"
      type="date"
      placeholder="Insert a date"
      class="date-input tex-md relative w-full rounded-md bg-slate-100 p-1 outline-none focus:bg-slate-200"
      :value="date"
      @input="handleEmit($event)"
      @focusout="focusOut"
      required
    />
    <input
      v-else
      type="text"
      placeholder="Insert a date"
      class="text-md w-full border-b-2 border-b-transparent bg-slate-100 p-1 outline-none"
      :value="convertDateToShortForm(date)"
      @focusin="focusIn"
    />
  </label>
</template>

<script setup lang="ts">
import IconLoader from '@/components/atoms/IconLoader';
import { onUpdated, ref } from 'vue';
import { convertDateToShortForm } from '@/utils/Dates';

defineProps<{
  date: string;
}>();

const emit = defineEmits<{
  (e: 'update:date', value: string): void;
}>();

const dateRef = ref<HTMLInputElement | null>(null);

function handleEmit(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:date', target.value);
}

const focus = ref(false);
const dateInput = ref<HTMLInputElement | null>(null);

function focusIn() {
  focus.value = true;
}

function focusOut() {
  focus.value = false;
}

onUpdated(() => {
  dateInput.value?.focus();
});

defineExpose({
  dateRef,
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
