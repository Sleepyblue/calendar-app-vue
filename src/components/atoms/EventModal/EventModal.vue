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
        ref="startHourInput"
        type="number"
        min="0"
        max="24"
        placeholder="Insert a starting hour (0 - 23)"
        class="bg-slate-100 p-1"
        v-model="eventStartHour"
        :onChange="onChange"
        required
      />
      <input
        ref="endHourInput"
        type="number"
        :min="eventStartHour"
        max="24"
        :placeholder="`Insert an ending hour (${eventStartHour ?? 0} - 23)`"
        class="bg-slate-100 p-1"
        v-model="eventEndHour"
        required
      />
    </form>
    <template #action>
      <Button
        v-if="edit"
        class="rounded-lg bg-[#f5a278] px-6 py-2 font-bold text-white active:translate-y-[1px]"
        type="submit"
        @click.prevent="editEvent(id as any)"
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
import { onMounted, ref } from 'vue';
import ModalTemplate from '@/components/templates/ModalTemplate/ModalTemplate.vue';
import Button from '@/components/molecules/Button';
import { useCalendarStore } from '@/stores/calendarStore';

const { id, title, date, startHour, endHour } = defineProps<{
  show: boolean;
  edit?: boolean;
  id?: string;
  title?: string;
  date?: string;
  startHour?: number;
  endHour?: number;
}>();

const emit = defineEmits<{
  (e: 'close', show: boolean): void;
}>();

const store = useCalendarStore();
const findEvent = store.findWeekViewEvent;
const titleInput = ref<HTMLInputElement | null>(null);
const dateInput = ref<HTMLInputElement | null>(null);
const startHourInput = ref<HTMLInputElement | null>(null);
const endHourInput = ref<HTMLInputElement | null>(null);
const formValidation = ref<HTMLFormElement | null>(null);

const error = ref('');
const eventTitle = ref(title || '');
const eventDate = ref(date || '');
const eventStartHour = ref(startHour);
const eventEndHour = ref(endHour);

onMounted(() => {
  if (id) {
    const event = findEvent(id!);

    if (!event) return;
    eventTitle.value = event.title;
    eventDate.value = event.date;
    eventStartHour.value = event?.startHour;
    eventEndHour.value = event?.endHour;
  }
});

function onChange() {
  if (eventEndHour.value! < eventStartHour.value!)
    eventEndHour.value = eventStartHour.value;
}

function addEvent() {
  if (formValidation.value?.checkValidity()) {
    store.addEvent(
      eventTitle.value,
      eventDate.value,
      eventStartHour.value!,
      eventEndHour.value!
    );

    emit('close', true);
  } else if (!titleInput.value?.checkValidity()) {
    error.value = `Please add an event title`;
    return;
  } else if (!dateInput.value?.checkValidity()) {
    error.value = `Please add the event's date`;
    return;
  } else if (!startHourInput.value?.checkValidity()) {
    error.value = `Please add an hour between 0 and 24`;
    return;
  } else if (!endHourInput.value?.checkValidity()) {
    error.value = `Please add an hour between ${eventStartHour.value} and 24`;
  }
}

function editEvent(id: string) {
  if (formValidation.value?.checkValidity()) {
    store.updateEvent(
      id,
      eventTitle.value,
      eventDate.value,
      eventStartHour.value!,
      eventEndHour.value!
    );

    emit('close', true);
  } else if (!titleInput.value?.checkValidity()) {
    error.value = `Please add an event title`;
    return;
  } else if (!dateInput.value?.checkValidity()) {
    error.value = `Please add the event's date`;
    return;
  } else if (!startHourInput.value?.checkValidity()) {
    error.value = `Please add an hour between 1 and 24`;
    return;
  } else if (!endHourInput.value?.checkValidity()) {
    error.value = `Please add an hour between ${eventStartHour.value} and 24`;
  }
}
</script>
