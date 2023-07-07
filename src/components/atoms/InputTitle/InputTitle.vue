<template>
  <label
    for=""
    class="title-label relative flex items-center justify-start gap-2"
    :class="{ 'mb-2 border-[3px] border-[#f5788d] rounded-lg pl-1': error }"
  >
    <IconLoader name="Title" :size="18" class="shrink-0 text-gray-400" />
    <input
      ref="titleRef"
      type="text"
      placeholder="Add a title"
      class="title-input w-full rounded-t-md bg-slate-100 p-1 outline-none focus:bg-slate-200"
      :value="title"
      @input="handleEmit($event)"
      @focusout="isFieldValid"
      @change="isFieldValid"
      required
    />
    <p v-if="error" class="absolute -bottom-5 left-0 text-xs text-[#f5788d]">
      Please, enter a title
    </p>
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IconLoader from '@/components/atoms/IconLoader';

const { title } = defineProps<{
  title: string;
}>();

const emit = defineEmits<{
  (e: 'update:title', value: string): void;
  (e: 'invalidField', value: boolean): void;
}>();

const error = ref(false);

function isFieldValid() {
  if (title === '') {
    error.value = true;
  } else {
    error.value = false;
  }

  emit('invalidField', error.value);
}

function handleEmit(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:title', target.value);
}
</script>

<style>
.title-label:has(.title-input:focus)::before {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: calc(100% - 26px);
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
