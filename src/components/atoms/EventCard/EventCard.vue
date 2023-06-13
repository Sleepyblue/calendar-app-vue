<template>
  <div
    class="event-card grid-position flex h-10 w-11/12 items-center justify-start gap-2 rounded-md border-2 border-l-[6px] border-slate-100 p-1 text-sm text-white shadow-md"
    @click="fillEvent"
  >
    <p>
      {{ eventHour }}
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
      :hour="modalHour"
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

const { eventDate, eventId, eventTitle, eventHour } = defineProps<{
  eventDate: string;
  eventId: string;
  eventTitle: string;
  eventHour: number;
}>();

const store = useCalendarStore();
const modalTitle = ref('');
const modalDate = ref('');
const modalHour = ref(0);

function fillEvent() {
  const targetEvent = store.weekEvents?.events.find(
    (event) => event.id === eventId
  );

  modalDate.value = eventDate;
  modalTitle.value = targetEvent!.title;
  modalHour.value = +targetEvent!.hour;

  show.value = true;
}
</script>

<style>
.grid-position {
  grid-row-start: v-bind('eventHour + 1');
}

.event-card {
  background-color: #f5a278;
}
</style>
