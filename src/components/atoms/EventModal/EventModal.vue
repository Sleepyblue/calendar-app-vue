<template>
  <Teleport :to="attachTo" :disabled="disabled">
    <dialog
      id="modal"
      :open="show"
      ref="trapRef"
      class="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      @keydown.esc.exact="closeModal"
      @click.self="closeModal"
    >
      <div
        class="relative flex w-1/3 flex-col gap-8 rounded-lg bg-slate-100 p-4"
      >
        <p
          v-if="error"
          class="absolute -top-10 left-0 w-full rounded-xl bg-[#f5a278] p-1 text-center text-white"
        >
          {{ error }}
        </p>
        <form class="flex flex-col gap-2" ref="formValidation">
          <input
            ref="titleInput"
            type="text"
            placeholder="Add a title"
            class="bg-slate-100 p-1 text-lg"
            v-model.trim="eventTitle"
            required
          />
          <input
            ref="dateInput"
            type="date"
            placeholder="Insert a date"
            class="bg-slate-100 p-1"
            v-model="eventDate"
            required
          />
          <input
            ref="hourInput"
            type="number"
            min="1"
            max="24"
            placeholder="Insert an hour (1 - 24)"
            class="bg-slate-100 p-1"
            v-model="eventHour"
            required
          />
        </form>
        <hr />
        <div class="flex justify-end gap-8 align-bottom">
          <Button
            class="rounded-lg bg-slate-100 px-6 py-2 font-bold text-black active:translate-y-[1px]"
            @click.prevent="closeModal"
            >Close</Button
          >
          <Button
            class="rounded-lg bg-[#f5a278] px-6 py-2 font-bold text-white active:translate-y-[1px]"
            type="submit"
            @click.prevent="addEvent"
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

const { show, date, hour } = withDefaults(
  defineProps<{
    show: boolean;
    disabled?: boolean;
    attachTo?: string;
    date?: string;
    hour?: string;
  }>(),
  {
    attachTo: 'body',
  }
);

const emit = defineEmits<{
  (e: 'close', show: boolean): void;
}>();

const store = useCalendarStore();
const titleInput = ref<HTMLInputElement | null>(null);
const dateInput = ref<HTMLInputElement | null>(null);
const hourInput = ref<HTMLInputElement | null>(null);
const formValidation = ref<HTMLFormElement | null>(null);
const error = ref('');
const { trapRef, clearFocusTrap } = useFocusTrap();

const eventTitle = ref('');
const eventDate = ref(date || '');
const eventHour = ref(hour || '');

function closeModal() {
  clearFocusTrap();
  emit('close', false);
}

function addEvent() {
  console.log(titleInput.value?.checkValidity());
  console.log(dateInput.value?.checkValidity());
  console.log(hourInput.value?.checkValidity());

  if (formValidation.value?.checkValidity()) {
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
            eventHour: (+eventHour.value + 1).toString(),
          },
        ],
      };

      store.events.push(eventObject);
    }

    closeModal();
  } else if (!titleInput.value?.checkValidity()) {
    error.value = `Please add an event title`;
    return;
  } else if (!dateInput.value?.checkValidity()) {
    error.value = `Please add the event's date`;
    return;
  } else if (!hourInput.value?.checkValidity()) {
    error.value = `Please add an hour between 1 and 24`;
  }
}

onMounted(() => {
  titleInput.value?.focus();
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

#modal > div,
#modal p {
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.25);
}
</style>
