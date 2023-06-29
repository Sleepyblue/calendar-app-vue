import { ref, computed, toRaw, watch } from 'vue';
import { defineStore } from 'pinia';
import type { CalendarEvents, DayEvent } from '@/types';
import { getWeekNumber } from '@/utils/Dates';
import UniqueIdentifier from '@/utils/UniqueIdentifier';

export const useCalendarStore = defineStore('calendar', () => {
  const weekDates = ref<number[]>();
  const weekNumber = computed(() => getWeekNumber(weekDates.value![0]));
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

  function addEvent(
    title: string,
    date: string,
    startHour: number,
    endHour: number
  ) {
    const weekMatches = weekNumber.value === getWeekNumber(date);

    if (weekMatches && weekEvents.value) {
      weekEvents.value.events.push({
        id: UniqueIdentifier(),
        date: date,
        title: title,
        startHour: startHour,
        endHour: endHour,
      });
    } else {
      calendarEvents.value.push({
        weekNumber: getWeekNumber(date),
        events: [
          {
            id: UniqueIdentifier(),
            date: date,
            title: title,
            startHour: startHour,
            endHour: endHour,
          },
        ],
      });
    }
  }

  function findWeekViewEvent(id: string) {
    const currentViewWeek = calendarEvents.value.find(
      (week) => week.weekNumber === weekNumber.value
    );

    const event = currentViewWeek?.events.find((event) => event.id === id);

    return event;
  }

  function updateEvent(
    id: string,
    title: string,
    date: string,
    startHour: number,
    endHour: number
  ) {
    const targetEvent = weekEvents.value?.events.find(
      (event) => event.id === id
    );
    const initialDate = targetEvent?.date;

    if (!targetEvent) return;
    targetEvent.startHour = startHour;
    targetEvent.endHour = endHour;
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
    const checkWeekNumber = getWeekNumber(event.date);
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

  function deleteEvent(uuid: string) {
    const targetEvent = weekEvents.value?.events.find(
      (event) => event.id === uuid
    );

    const deletedEvent = weekEvents.value?.events.splice(
      weekEvents.value?.events.indexOf(targetEvent!),
      1
    );

    return deletedEvent;
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
    deleteEvent,
    findWeekViewEvent,
  };
});
