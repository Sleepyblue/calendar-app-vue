import { CalendarEvent } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCalendarStore = defineStore('calendar', () => {
  const view = ref();
  const events = ref<CalendarEvent[]>([]);

  return { view, events };
});
