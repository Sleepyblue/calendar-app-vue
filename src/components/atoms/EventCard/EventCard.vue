<template>
  <div
    class="event-card grid-start flex h-full w-11/12 items-start justify-start gap-2 rounded-md border-2 border-l-[6px] border-slate-100 p-1 text-sm text-white shadow-md"
    :class="{ 'grid-end': eventEndHour }"
    @click="fillEvent"
  >
    <p>
      {{ eventStartHour }}
    </p>
    <p class="overflow-hidden text-ellipsis whitespace-nowrap">
      {{ eventTitle }}
    </p>
    <EventModal
      v-if="show"
      :show="show"
      :id="eventId"
      :title="modalTitle"
      :date="modalDate"
      :startHour="modalStartHour"
      :endHour="modalEndHour"
      @close="show = false"
      edit
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useCalendarStore } from '@/stores/calendarStore';
import EventModal from '@/components/atoms/EventModal';

const show = ref(false);

const { eventDate, eventId, eventTitle, eventStartHour, eventEndHour } =
  defineProps<{
    eventDate: string;
    eventId: string;
    eventTitle: string;
    eventStartHour: number;
    eventEndHour: number;
  }>();

const store = useCalendarStore();
const modalTitle = ref('');
const modalDate = ref('');
const modalStartHour = ref(0);
const modalEndHour = ref(0);

function fillEvent() {
  const targetEvent = store.weekEvents?.events.find(
    (event) => event.id === eventId
  );

  modalDate.value = eventDate;
  modalTitle.value = targetEvent!.title;
  modalStartHour.value = +targetEvent!.startHour;
  modalEndHour.value = +targetEvent!.endHour;

  show.value = true;
}
</script>

<style>
.grid-start {
  grid-row-start: v-bind('eventStartHour + 1');
}

.grid-end {
  grid-row-end: v-bind('eventEndHour + 1');
}

.event-card {
  background-color: #f5a278;
}
</style>
