<template>
  <Teleport :to="attachTo || 'body'" :disabled="disableTeleport">
    <dialog
      id="modal"
      :open="show"
      ref="trapRef"
      class="absolute left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center"
      @keydown.esc.exact="closeModal"
      @click.self="closeModal"
    >
      <div class="w-1/3 rounded-xl bg-slate-100">
        <header class="relative h-10 w-full rounded-t-xl bg-[#f5e178]">
          <p
            v-if="errorMessage"
            class="absolute -top-10 left-0 w-full rounded-md bg-[#f5788d] p-1 text-center text-white"
          >
            {{ errorMessage }}
          </p>
        </header>
        <main class="flex w-full flex-col gap-8 p-4" ref="modalContainer">
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
        </main>
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
  modalContainer.value?.querySelector<HTMLElement>('#modal input')?.focus();
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

#modal > div {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

#modal header > p::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(100% + 6px);
  height: calc(100% + 6px);
  transform: translate(-50%, -50%);
  border-radius: 8px;
  background: linear-gradient(120deg, #f5788d, #f5e178, #f5788d);
  background-size: 300% 300%;
  z-index: -1;
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
