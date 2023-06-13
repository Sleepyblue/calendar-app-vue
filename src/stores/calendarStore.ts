import { ref, computed, toRaw, markRaw } from 'vue';
import { defineStore } from 'pinia';
import type { CalendarEvents, DayEvent } from '@/types';
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
    const weekMatches = weekNumber.value === getWeekNumber([new Date(date)]);

    if (weekMatches && weekEvents.value) {
      weekEvents.value?.events?.push({
        id: UniqueIdentifier(),
        date: date,
        title: title,
        hour: hour,
      });
    } else {
      calendarEvents.value.push({
        weekNumber: getWeekNumber([new Date(date)]),
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
    const initialDate = targetEvent?.date;

    if (!targetEvent) return;
    targetEvent.hour = hour;
    targetEvent.title = title;
    targetEvent.date = date;

    if (initialDate !== date) {
      const movedEvent = weekEvents.value?.events.splice(
        weekEvents.value?.events.indexOf(targetEvent),
        1
      );
      const unproxy = toRaw(movedEvent![0]);

      moveEvent(unproxy);
    }
  }

  function moveEvent(event: DayEvent) {
    const checkWeekNumber = getWeekNumber([new Date(event.date)]);
    const checkWeekExists = calendarEvents.value.find(
      (week) => week.weekNumber === checkWeekNumber
    );

    if (checkWeekExists) checkWeekExists.events.push(event);
    else
      calendarEvents.value.push({
        weekNumber: checkWeekNumber,
        events: [event],
      });
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
