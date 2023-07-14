<template>
  <div id="calendar" ref="calendar" class="overflow-x-hidden overflow-y-scroll">
    <header class="sticky left-0 top-0 z-50 grid grid-cols-8 bg-slate-100 pb-4">
      <!-- TODO: Rework this -->
      <div class="px-1" />
      <CalendarHeader
        v-for="day in weekDates"
        :shortDate="convertDateToShorthand(day)"
        :dateTime="day"
      />
    </header>
    <main class="relative grid grid-cols-8">
      <CalendarHours />
      <CalendarDay
        v-for="(day, index) in weekDates"
        :key="day"
        :day="day"
        :index="index"
        @openEventDisplay="handleDisplayCard"
        @openEventModal="handleModal"
      />
      <EventDisplay
        v-if="show"
        :id="id"
        :offsetTop="offsetTop"
        :offsetLeft="offsetLeft"
        :offsetWidth="offsetWidth"
        :horizontalPosition="horizontalPosition"
        :translate="translateY"
        @close="handleClosePreview"
        @openEditModal="handleEditModal"
      />
      <EventModal
        v-if="showModal"
        :show="showModal"
        :edit="showEditModal"
        :id="id"
        :date="date"
        :startHour="startHour"
        :endHour="endHour"
        @close="handleCloseModal"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUpdated, watch } from 'vue';
import CalendarDay from '@/components/molecules/CalendarDay';
import CalendarHours from '@/components/atoms/CalendarHours';
import CalendarHeader from '@/components/molecules/CalendarHeader';
import EventDisplay from '@/components/atoms/EventDisplay';
import EventModal from '@/components/atoms/EventModal';
import { useCalendarStore } from '@/stores/calendarStore';
import {
  convertWeekDatesToStrings,
  convertDateToShorthand,
  getCurrentDate,
} from '@/utils/Dates';

interface modalEmit {
  event: MouseEvent;
  startHour: number;
  endHour: number;
}

const { isSidebarOpen, modalStatus, previewStatus } = defineProps<{
  isSidebarOpen: boolean;
  modalStatus?: boolean;
  previewStatus?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modalStatus', value: boolean): void;
  (e: 'update:previewStatus', value: boolean): void;
}>();

const store = useCalendarStore();
const weekDates = computed(() => convertWeekDatesToStrings(store.weekDates!));

const show = ref(false);
const showModal = ref(false);
const showEditModal = ref(false);
const offsetTop = ref(0);
const offsetLeft = ref(0);
const offsetWidth = ref(0);
const storedTarget = ref<HTMLElement | undefined>(undefined);
const calendar = ref<HTMLElement | null>(null);
const horizontalPosition = ref('');
const translateY = ref(false);
const id = ref();
const date = ref();
const startHour = ref<number | undefined>(0);
const endHour = ref<number | undefined>(0);

function handleEditModal(eventId: string) {
  id.value = eventId;
  showEditModal.value = true;
  showModal.value = true;
}

function handleCloseModal() {
  emit('update:modalStatus', false);
  showModal.value = false;
}

function handleClosePreview() {
  emit('update:previewStatus', false);
  show.value = false;
}

function handleModal(emitted: modalEmit) {
  const target = emitted.event?.target as HTMLElement;

  if (!target) return;
  id.value = target.getAttribute('data-id');
  date.value = target.parentElement?.id;

  if (!date === undefined) return;

  startHour.value = emitted.startHour;
  if (!startHour.value === undefined) return;

  endHour.value = emitted.endHour;
  show.value = false;
  showModal.value = true;
  if (!endHour.value === undefined) return;
}

function handleDisplayCard(e?: MouseEvent) {
  const target = e?.target as HTMLElement;

  if (show.value && storedTarget.value && storedTarget.value === target) {
    return;
  } else show.value = false;

  id.value = target.getAttribute('data-id');
  storedTarget.value = target;
  const parentTarget = target.parentElement as HTMLElement;

  if (!storedTarget.value) return;

  const styles = window.getComputedStyle(target);
  const gridRowStart = +styles.getPropertyValue('grid-row-start');
  const gridRowEnd = +styles.getPropertyValue('grid-row-end');

  if (gridRowEnd - gridRowStart > 16) {
    target.scrollIntoView({ block: 'start', behavior: 'smooth' });
  } else {
    target.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  // 'Waiting' for `scrollIntoView` to finish before calculating offsets. Avoids misplacements
  setTimeout(() => {
    offsetTop.value = target.offsetTop;
    offsetLeft.value = parentTarget.offsetLeft;
    offsetWidth.value = parentTarget.offsetWidth;

    // Adjusting the scrolling behaviour for longer events
    if (gridRowEnd - gridRowStart > 16 && gridRowEnd - gridRowStart <= 18) {
      calendar.value?.scrollBy({ top: -60, behavior: 'smooth' });
    } else if (gridRowEnd - gridRowStart > 18) {
      calendar.value?.scrollBy({ top: -120, behavior: 'auto' });
    }

    // Placing the preview taking in account the available bottom space
    if (gridRowStart >= 18) {
      offsetTop.value = target!.offsetTop + target!.offsetHeight;
      translateY.value = true;
    } else {
      translateY.value = false;
    }

    // Placing the preview taking in account the available right space
    const calendarRight = calendar.value!.getBoundingClientRect().right;
    const targetRight = target!.getBoundingClientRect().right;
    const percentage = Math.round((targetRight / calendarRight) * 100);
    const verdict = percentage > 60 ? 'right' : 'left';

    horizontalPosition.value = verdict;

    if (!show.value) {
      show.value = true;
      emit('update:previewStatus', true);
    }
  }, 450);
}

function updateDisplayCardPosition(targetEl?: HTMLElement) {
  if (!storedTarget.value) return;
  const parentTarget = targetEl?.parentElement as HTMLElement;
  const styles = window.getComputedStyle(targetEl!);
  const gridRowStart = +styles.getPropertyValue('grid-row-start');

  if (gridRowStart >= 18) {
    offsetTop.value = targetEl!.offsetTop + targetEl!.offsetHeight;
  } else {
    offsetTop.value = targetEl!.offsetTop;
  }

  offsetLeft.value = parentTarget.offsetLeft;

  offsetWidth.value = parentTarget.offsetWidth;
}

function handlePositionUpdate() {
  updateDisplayCardPosition(storedTarget.value);
}

onUpdated(() => {
  if (show.value) {
    window.addEventListener('resize', handlePositionUpdate);
  } else {
    window.removeEventListener('resize', handlePositionUpdate);
  }
});

watch(
  () => isSidebarOpen,
  () => {
    setTimeout(() => {
      handlePositionUpdate();
    }, 300);
  },
);

// TODO: Add these into a single watcher
watch(
  () => modalStatus,
  () => {
    if (modalStatus) {
      date.value = getCurrentDate();
      id.value = '';
      startHour.value = undefined;
      endHour.value = undefined;
      showModal.value = true;
    }
  },
);

watch(
  () => previewStatus,
  () => {
    if (previewStatus) show.value = true;
    else show.value = previewStatus;
  },
);
</script>

<style>
#calendar {
  display: grid;
  grid-template-rows: minmax(0, 50px) minmax(0, 1fr);
}

#calendar::-webkit-scrollbar {
  width: 18px;
  background-color: theme('backgroundColor.slate.200');
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

#calendar::-webkit-scrollbar-thumb {
  background: #f5a278;
  border-radius: 50px;
  border: 6px solid theme('borderColor.slate.200');
}
</style>
