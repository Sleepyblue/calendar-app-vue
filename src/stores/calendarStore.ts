import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { CalendarEvents } from '@/types';
import { getWeekNumber } from '@/utils/Dates';
import UniqueIdentifier from '@/utils/UniqueIdentifier';

export const useCalendarStore = defineStore('calendar', () => {
  const weekDates = ref();
  const weekNumber = computed(() => getWeekNumber(weekDates.value));
  const calendarEvents = ref<CalendarEvents[]>([]);
  const weekEvents = computed(() => {
    const findWeek = calendarEvents.value.find(
      (week) => week.weekNumber === weekNumber.value
    );
    return findWeek;
  });

  function setWeekDates(dates: number[]) {
    weekDates.value = dates;
  }

  function updateWeekDates(dates: number[]) {
    weekDates.value = dates;
  }

  function addEvent(title: string, date: string, hour: number) {
    if (weekEvents.value) {
      weekEvents.value.events?.push({
        id: UniqueIdentifier(),
        date: date,
        title: title,
        hour: hour,
      });
    } else {
      calendarEvents.value.push({
        weekNumber: weekNumber.value,
        events: [
          {
            id: UniqueIdentifier(),
            date: date,
            title: title,
            hour: hour,
          },
        ],
      });
    }
  }

  function updateEvent(id: string, title: string, date: string, hour: number) {
    let targetEvent = weekEvents.value?.events.find((event) => event.id === id);

    if (!targetEvent) return;
    targetEvent.title = title;
    targetEvent.date = date;
    targetEvent.hour = hour;
  }

  return {
    weekDates,
    weekNumber,
    calendarEvents,
    weekEvents,
    setWeekDates,
    updateWeekDates,
    addEvent,
    updateEvent,
  };
});
