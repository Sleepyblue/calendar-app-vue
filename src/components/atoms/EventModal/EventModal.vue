<template>
  <GlobalModalTemplate
    :show="show"
    focusOnElement="input"
    @close="emit('close', true)"
  >
    <form class="flex flex-col gap-3" ref="formValidation" id="event-form">
      <InputTitle
        ref="titleInput"
        v-model:title.trim="eventTitle"
        @invalidField="errorCheck"
      />
      <InputDate
        ref="dateInput"
        v-model:date.trim="eventDate"
        @invalidField="errorCheck"
      />
      <div class="flex flex-row items-center justify-start gap-2">
        <IconLoader name="Clock" :size="18" class="shrink-0 text-gray-400" />
        <InputHour
          ref="startHourInput"
          v-model:startHour="eventStartHour"
          @update:startHour="onStartChange"
          @invalidField="errorCheck"
        />
        <InputHour
          ref="endHourInput"
          v-model:endHour="eventEndHour"
          @update:endHour="onEndChange"
          :minHour="eventStartHour || 0"
          @invalidField="errorCheck"
        />
      </div>
    </form>
    <template #action>
      <Button
        v-if="edit"
        class="relative rounded-lg px-6 py-2 font-bold text outline-none text-white hover:text-black focus-visible:text-black"
        type="submit"
        @click.prevent="editEvent(id as any)"
        :disabled="error"
      >
        Save
      </Button>
      <Button
        v-else
        class="relative rounded-lg px-6 py-2 font-bold text-white outline-none hover:text-black focus-visible:text-black"
        type="submit"
        @click.prevent="addEvent"
        :disabled="error"
      >
        Create
      </Button>
    </template>
  </GlobalModalTemplate>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import GlobalModalTemplate from '@/components/templates/GlobalModalTemplate';
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
const formValidation = ref<HTMLFormElement | null>(null);

const error = ref(false);
const eventTitle = ref(title || '');
const eventDate = ref(date || '');
const eventStartHour = ref(startHour);
const eventEndHour = ref(endHour || 0);
const errorObject = reactive({
  title: false,
  date: false,
  startHour: false,
  endHour: false,
});

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

function onStartChange() {
  if (eventStartHour.value && eventEndHour.value! <= eventStartHour.value!) {
    eventEndHour.value = eventStartHour.value + 1;
  }
}

function onEndChange(value: number) {
  if (eventEndHour.value === eventStartHour.value) return;
  else eventEndHour.value = value;
}

function errorCheck(
  value: Partial<{ [key in keyof typeof errorObject]: boolean }>,
) {
  const obKey = Object.keys(value)[0] as keyof typeof errorObject;
  const keyValue: boolean = Object.values(value)[0];

  errorObject[obKey] = keyValue;

  if (Object.values(errorObject).some((value) => value)) error.value = true;
  else error.value = false;
}

function addEvent() {
  if (formValidation.value?.checkValidity()) {
    store.addEvent(
      eventTitle.value,
      eventDate.value,
      eventStartHour.value!,
      eventEndHour.value!,
    );

    emit('close', true);
  }
}

function editEvent(id: string) {
  if (formValidation.value?.checkValidity()) {
    store.updateEvent(
      id,
      eventTitle.value,
      eventDate.value,
      eventStartHour.value!,
      eventEndHour.value!,
    );

    emit('close', true);
  }
}
</script>
@/components/templates/GlobalModalTemplate
