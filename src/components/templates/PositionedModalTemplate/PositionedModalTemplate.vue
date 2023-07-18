<template>
  <div class=".positioned-modal" ref="trapRef" @keydown.esc.exact="closeModal">
    <slot name="header">
      <header class="relative h-10 w-full rounded-t-xl bg-[#f5e178]" />
    </slot>

    <main class="flex flex-col gap-6 p-4">
      <slot />
      <hr v-if="slots.action" />
      <div v-if="slots.action" class="flex justify-end gap-8 align-bottom">
        <slot name="action" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, useSlots } from 'vue';
import useFocusTrap from '@/composables/useFocusTrap';

const { focusOnElement } = defineProps<{
  focusOnElement: string;
}>();

const emit = defineEmits<{
  (e: 'close', show: boolean): void;
}>();

const slots = useSlots();
const { trapRef, clearFocusTrap } = useFocusTrap();

function closeModal() {
  clearFocusTrap();
  emit('close', true);
}

onMounted(() => {
  (trapRef.value as HTMLDivElement)
    ?.querySelector<HTMLElement>(`.positioned-modal ${focusOnElement}`)
    ?.focus();
});

onUnmounted(() => {
  clearFocusTrap();
});
</script>
