<template>
  <label
    for="label"
    class="input-label relative"
    :class="[
      { 'mb-2 border-[3px] border-[#f5788d] rounded-lg pl-1': error },
      iconName ? 'flex items-center justify-start gap-2' : 'w-full',
    ]"
  >
    <IconLoader
      v-if="iconName"
      :name="iconName"
      :size="18"
      class="shrink-0 text-gray-400"
    />
    <slot />
    <p v-if="error" class="absolute -bottom-5 left-0 text-xs text-[#f5788d]">
      {{ errorMessage }}
    </p>
  </label>
</template>

<script setup lang="ts">
import { computed, onUpdated } from 'vue';
import IconLoader from '@/components/atoms/IconLoader';

const { iconName, focusRef } = defineProps<{
  label: string;
  iconName?: string;
  error: boolean;
  errorMessage: string;
  focusRef?: HTMLInputElement | null;
}>();

const adjustWidth = computed(() => (iconName ? 26 : 0));

onUpdated(() => {
  if (focusRef) {
    focusRef.focus();
  }
});
</script>

<style>
.input-label:has(input:focus)::before {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: calc(100% - v-bind(adjustWidth + 'px'));
  height: 2px;
  border-radius: 50px;
  background: linear-gradient(120deg, #f5788d, #f5e178, #f5788d);
  background-size: 300% 300%;
  animation: gradient-animation 4s ease-in-out infinite;
}

.input-label:has(input:focus + p)::before {
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
</style>
