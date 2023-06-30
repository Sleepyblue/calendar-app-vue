<template>
  <Teleport :to="attachTo || 'body'" :disabled="disableTeleport">
    <dialog
      id="modal"
      :open="show"
      ref="trapRef"
      class="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center"
      @keydown.esc.exact="closeModal"
      @click.self="closeModal"
    >
      <div
        class="relative flex w-1/3 flex-col gap-8 rounded-lg bg-slate-100 p-4"
        ref="modalContainer"
      >
        <p
          v-if="errorMessage"
          class="absolute -top-10 left-0 w-full rounded-xl bg-[#f5a278] p-1 text-center text-white"
        >
          {{ errorMessage }}
        </p>
        <slot />
        <hr />
        <div class="flex justify-end gap-8 align-bottom">
          <Button
            class="rounded-lg bg-slate-100 px-6 py-2 font-bold text-black active:translate-y-[1px]"
            @click.prevent="closeModal"
            >Close</Button
          >
          <slot name="action" />
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useFocusTrap from '@/composables/useFocusTrap';
import Button from '@/components/molecules/Button';

const { show, errorMessage } = defineProps<{
  show: boolean;
  errorMessage?: string;
  attachTo?: string;
  disableTeleport?: boolean;
}>();

const emit = defineEmits<{
  (e: 'close', show: boolean): void;
}>();

const modalContainer = ref<HTMLDivElement | null>(null);
const { trapRef, clearFocusTrap } = useFocusTrap();

function closeModal() {
  clearFocusTrap();
  emit('close', true);
}

onMounted(() => {
  // would be good to be dynamic
  modalContainer.value
    ?.querySelector<HTMLElement>('form > :nth-child(1)')
    ?.focus();
});
</script>

<style>
#modal {
  background: repeating-linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.1) 1px,
    rgba(0, 0, 0, 0.15) 1px,
    rgba(0, 0, 0, 0.15) 20px
  );
  backdrop-filter: blur(3px);
}

#modal button {
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.15);
}

#modal button:hover {
  background-color: rgba(245, 162, 120, 0.4);
}

#modal button:active {
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.15);
}

#modal > div,
#modal p {
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.25);
}
</style>
