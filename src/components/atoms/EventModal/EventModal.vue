<template>
  <Teleport to="body">
    <dialog
      id="modal"
      :open="show"
      ref="trapRef"
      class="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      @keydown.esc.exact="closeModal"
      @click.self="closeModal"
    >
      <div class="flex w-1/3 flex-col gap-8 rounded-lg bg-slate-100 p-4">
        <form class="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Add a title"
            ref="modalInput"
            class="bg-slate-100 p-1 text-lg"
            v-model.trim="eventTitle"
          />
          <input
            type="date"
            placeholder="Insert a date"
            class="bg-slate-100 p-1"
            v-model="eventDate"
          />
          <input
            type="number"
            min="0"
            max="23"
            placeholder="Insert an hour (0 - 23)"
            class="bg-slate-100 p-1"
            v-model="eventHour"
          />
        </form>
        <hr />
        <div class="flex justify-end gap-8 align-bottom">
          <Button
            class="rounded-lg bg-slate-100 px-6 py-2 font-bold text-black active:translate-y-[1px]"
            @click="closeModal"
            >Close</Button
          >
          <Button
            class="rounded-lg bg-[#f5a278] px-6 py-2 font-bold text-white active:translate-y-[1px]"
            @click="addEvent"
            >Create</Button
          >
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useCalendarStore } from '@/stores/calendarStore';
import type { CalendarEvent } from '@/types';
import useFocusTrap from '@/composables/useFocusTrap';
import Button from '@/components/molecules/Button';

const { show } = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: 'close', show: boolean): void;
}>();

const store = useCalendarStore();
const modalInput = ref<HTMLInputElement | null>(null);
const eventTitle = ref('');
const eventDate = ref('');
const eventHour = ref('');
const { trapRef, clearFocusTrap } = useFocusTrap();

function closeModal() {
  clearFocusTrap();
  emit('close', false);
}

function addEvent() {
  // TODO: handle the add event logic
  const existingEvent = store.events.find(
    (event) => event.date === eventDate.value
  );

  if (existingEvent) {
    existingEvent.events?.push({
      eventName: eventTitle?.value,
      eventHour: eventHour.value,
    });
  } else {
    const eventObject: CalendarEvent = {
      date: eventDate.value,
      events: [
        {
          eventName: eventTitle.value,
          eventHour: eventHour.value,
        },
      ],
    };

    store.events.push(eventObject);
  }
}

onMounted(() => {
  modalInput.value?.focus();
});
</script>

<style>
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
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.25);
}
</style>
