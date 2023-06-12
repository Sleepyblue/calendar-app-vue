import type { CalendarEvent } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCalendarStore = defineStore('calendar', () => {
  const view = ref();
  const events = ref<CalendarEvent[]>([]);

  function setView(dates: number[]) {
    view.value = dates;
  }

  function updateView(dates: number[]) {
    view.value = dates;
  }

  return { view, setView, updateView, events };
});
