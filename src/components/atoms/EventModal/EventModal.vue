<template>
  <ModalTemplate
    :show="show"
    :errorMessage="error"
    @close="emit('close', true)"
  >
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
    <template #action>
      <Button
        v-if="edit"
        class="rounded-lg bg-[#f5a278] px-6 py-2 font-bold text-white active:translate-y-[1px]"
        type="submit"
        @click.prevent="editEvent(id)"
      >
        Save
      </Button>
      <Button
        v-else
        class="rounded-lg bg-[#f5a278] px-6 py-2 font-bold text-white active:translate-y-[1px]"
        type="submit"
        @click.prevent="addEvent"
      >
        Create
      </Button>
    </template>
  </ModalTemplate>
</template>

<script setup lang="ts">
import { ref, toRef } from 'vue';
import ModalTemplate from '@/components/templates/ModalTemplate/ModalTemplate.vue';
import { useCalendarStore } from '@/stores/calendarStore';
import type { CalendarEvent } from '@/types';
import Button from '@/components/molecules/Button';
import UniqueIdentifier from '@/utils/UniqueIdentifier';

const { title, date, hour } = defineProps<{
  show: boolean;
  edit?: boolean;
  id?: string;
  title?: string;
  date?: string;
  hour?: string;
}>();

const emit = defineEmits<{
  (e: 'close', show: boolean): void;
}>();

const store = useCalendarStore();
const titleInput = ref<HTMLInputElement | null>(null);
const dateInput = ref<HTMLInputElement | null>(null);
const hourInput = ref<HTMLInputElement | null>(null);
const formValidation = ref<HTMLFormElement | null>(null);

const error = ref('');
const eventTitle = ref(title || '');
const eventDate = ref(date || '');
const eventHour = ref(hour || '');

function addEvent() {
  if (formValidation.value?.checkValidity()) {
    const existingDate = store.events.find(
      (event) => event.date === eventDate.value
    );

    if (existingDate) {
      existingDate.events?.push({
        id: UniqueIdentifier(),
        eventName: eventTitle?.value,
        eventHour: eventHour.value,
      });
    } else {
      const eventObject: CalendarEvent = {
        date: eventDate.value,
        events: [
          {
            id: UniqueIdentifier(),
            eventName: eventTitle.value,
            eventHour: (+eventHour.value + 1).toString(),
          },
        ],
      };

      store.events.push(eventObject);
    }

    emit('close', true);
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

function editEvent(id: string) {
  if (formValidation.value?.checkValidity()) {
    console.log('Edited', id);

    // store.events.push(eventObject);

    emit('close', true);
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
</script>
