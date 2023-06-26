<template>
  <div
    id="calendar"
    ref="calendar"
    class="grid grid-cols-8 overflow-x-hidden overflow-y-scroll"
    v-on="show ? { scroll: handlePositionUpdate } : {}"
  >
    <CalendarHours class="z-0" />
    <CalendarDay
      class="z-0"
      v-for="(day, index) in weekDates"
      :key="day"
      :day="day"
      :index="index"
      @openEventDisplay="handleDisplayCard"
    />
    <EventDisplay
      v-if="show"
      :offsetTop="offsetTop"
      :offsetLeft="offsetLeft"
      :offsetWidth="offsetWidth"
      :horizontalPosition="horizontalPosition"
      :translate="translateY"
      @close="show = false"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onUpdated } from 'vue';
import CalendarDay from '@/components/molecules/CalendarDay';
import CalendarHours from '@/components/atoms/CalendarHours';
import EventDisplay from '@/components/atoms/EventDisplay';
import { useCalendarStore } from '@/stores/calendarStore';
import { convertWeekDatesToStrings } from '@/utils/Dates';

const store = useCalendarStore();
const weekDates = computed(() => convertWeekDatesToStrings(store.weekDates!));

const show = ref(false);
const offsetTop = ref(0);
const offsetLeft = ref(0);
const offsetWidth = ref(0);
const storedTarget = ref<HTMLElement | undefined>(undefined);
const calendar = ref<HTMLElement | null>(null);
const horizontalPosition = ref('');
const translateY = ref(false);

function handleDisplayCard(e?: MouseEvent) {
  const target = e?.target as HTMLElement;

  if (show.value && storedTarget.value && storedTarget.value === target) {
    return;
  } else show.value = false;

  storedTarget.value = target;
  const parentTarget = target.parentElement as HTMLElement;

  if (!storedTarget.value) return;

  const styles = window.getComputedStyle(target);
  const gridRowStart = +styles.getPropertyValue('grid-row-start');
  const gridRowEnd = +styles.getPropertyValue('grid-row-end');

  if (gridRowEnd - gridRowStart > 16) {
    target.scrollIntoView({ block: 'start', behavior: 'smooth' });
    console.log('start');
  } else {
    target.scrollIntoView({ block: 'center', behavior: 'smooth' });
    console.log('center');
  }

  // 'Waiting' for `scrollIntoView` to finish before calculating offsets. Avoids misplacements
  setTimeout(() => {
    offsetTop.value = target.getBoundingClientRect().top;
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
      offsetTop.value = target.getBoundingClientRect().bottom;
      translateY.value = true;
    } else {
      translateY.value = false;
    }

    // Placing the preview taking in account the available right space
    const targetRight = target.getBoundingClientRect().right;
    const calendarWidth = calendar.value!.getBoundingClientRect().width;
    const percentage = Math.round((targetRight / calendarWidth) * 100);

    const verdict = percentage > 60 ? 'right' : 'left';
    horizontalPosition.value = verdict;

    if (!show.value) show.value = true;
  }, 450);
}

function updateDisplayCardPosition(targetEl?: HTMLElement) {
  if (!storedTarget.value) return;
  const parentTarget = targetEl?.parentElement as HTMLElement;
  const styles = window.getComputedStyle(targetEl!);
  const gridRowStart = +styles.getPropertyValue('grid-row-start');

  if (gridRowStart >= 18) {
    offsetTop.value = targetEl!.getBoundingClientRect().bottom;
  } else {
    offsetTop.value = targetEl!.getBoundingClientRect().top;
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
</script>

<style>
#calendar::-webkit-scrollbar {
  width: 18px;
  background-color: theme('backgroundColor.slate.200');
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

#calendar::-webkit-scrollbar-thumb {
  background: linear-gradient(
    45deg,
    #f5a278 20%,
    #f9c7ae 20%,
    #f9c7ae 40%,
    #f5a278 40%,
    #f5a278 60%,
    #f9c7ae 60%,
    #f9c7ae 80%,
    #f5a278 80%
  );
  border-radius: 50px;
  border: 6px solid theme('borderColor.slate.200');
}
</style>
