<template>
  <div
    id="event-display"
    class="absolute h-64 w-96 rounded-md bg-slate-100"
    :class="[
      { 'card-translateX': horizontalPosition === 'right' },
      { 'card-translateY': translate },
      { 'card-translate': horizontalPosition === 'right' && translate },
    ]"
  >
    <header class="flex justify-end gap-2 bg-slate-200 p-1">
      <Button
        icon="Edit"
        :size="20"
        class="rounded-md p-[2px] text-[#f5a278] hover:bg-[#f5a278] hover:text-white"
        @click.prevent="handleEditModal"
      />
      <Button
        icon="Trash"
        :size="20"
        class="rounded-md p-[2px] text-[#f5a278] hover:bg-[#f5a278] hover:text-white"
        @click.prevent="handleDelete"
      />
      <Button
        icon="Close"
        :size="20"
        class="rounded-md p-[2px] text-[#f5a278] hover:bg-[#f5a278] hover:text-white"
        @click.prevent="closeDisplay"
      />
    </header>
    <main class="flex flex-col">
      <p>{{ title }}</p>
      <p>{{ date }}</p>
      <p>{{ startHour }} - {{ endHour }}</p>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Button from '@/components/molecules/Button';
import { useCalendarStore } from '@/stores/calendarStore';

const {
  id,
  offsetTop,
  offsetLeft,
  offsetWidth,
  horizontalPosition,
  translate,
} = defineProps<{
  id?: string;
  offsetTop: number;
  offsetLeft: number;
  offsetWidth: number;
  horizontalPosition: string;
  translate: boolean;
}>();

const emit = defineEmits<{
  (e: 'close', show: boolean): void;
  (e: 'openEditModal', id: string): void;
}>();

const store = useCalendarStore();
const deleteEvent = store.deleteEvent;
const findEvent = store.findWeekViewEvent;

const title = ref();
const date = ref();
const startHour = ref();
const endHour = ref();

const offsetSum = computed(() => {
  if (horizontalPosition === 'left') return offsetLeft + offsetWidth;
  else return offsetLeft;
});

const refinedOffsetTop = computed(() => offsetTop - 12);

function handleEditModal() {
  emit('openEditModal', id!);
  closeDisplay();
}

function handleDelete() {
  closeDisplay();
  deleteEvent(id!);
}

function closeDisplay() {
  emit('close', true);
}

onMounted(() => {
  const event = findEvent(id!);
  title.value = event?.title;
  date.value = event?.date;
  startHour.value = event?.startHour;
  endHour.value = event?.endHour;
});
</script>

<style>
#event-display {
  top: v-bind(refinedOffsetTop + 'px');
  left: v-bind(offsetSum + 'px');
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}

.card-translateX {
  transform: translateX(-108%);
}
.card-translateY {
  transform: translateY(-100%);
}

.card-translate {
  transform: translate(-108%, -100%);
}
</style>
