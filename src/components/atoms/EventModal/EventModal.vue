<template>
  <ModalTemplate
    :show="show"
    :errorMessage="error"
    @close="emit('close', true)"
  >
    <form class="flex flex-col gap-2" ref="formValidation" id="event-form">
      <InputTitle v-model:title="eventTitle" ref="titleInput" />
      <InputDate v-model:date.trim="eventDate" ref="dateInput" />
      <div class="flex flex-row items-center justify-start gap-2">
        <IconLoader name="Clock" :size="18" class="shrink-0 text-gray-400" />
        <InputHour v-model:hour="eventStartHour" @update:hour="onChange" />
        <InputHour v-model:hour="eventEndHour" :startHour="eventStartHour" />
      </div>
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
import ModalTemplate from '@/components/templates/ModalTemplate';
import Button from '@/components/molecules/Button';
import InputDate from '@/components/atoms/InputDate';
import InputTitle from '@/components/atoms/InputTitle';
import InputHour from '@/components/atoms/InputHour';
import IconLoader from '@/components/atoms/IconLoader';
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
const titleInput = ref<typeof InputTitle | null>(null);
const dateInput = ref<typeof InputDate | null>(null);
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
  if (eventStartHour.value && eventEndHour.value! <= eventStartHour.value!)
    eventEndHour.value = eventStartHour.value + 1;
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
  } else if (!titleInput.value?.titleRef.checkValidity()) {
    error.value = `Please add an event title`;
    return;
  } else if (!dateInput.value?.dateRef.checkValidity()) {
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
  } else if (!titleInput.value?.titleRef.checkValidity()) {
    error.value = `Please add an event title`;
    return;
  } else if (!dateInput.value?.dateRef.checkValidity()) {
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

<style>
.title-input:focus::before {
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
