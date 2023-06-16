/**
 * Outputs the current week dates in milliseconds, based on current date, by default. It allows to choose the number of week days outputed.
 */
export function getWeekDates(days: number = 7) {
  let weekDates = [];

  for (let i = 0; i <= days - 1; i++) {
    const currentDate = new Date();
    const currentDay = currentDate.getDay() === 0 ? 7 : currentDate.getDay();
    const day = currentDate.setDate(
      currentDate.getDate() + (days === 7 ? -currentDay + i + 1 : +i)
    );
    weekDates.push(day);
  }

  return weekDates;
}

/**
 * Outputs the current week number, based on the first element from the `getWeekDates` array.
 */

export function getWeekNumber(weekDates: Date[]): number {
  if (weekDates.length === 0) return 0;

  if (weekDates.length === 0) return 0;

  const firstDate = new Date(weekDates[0]);
  const lastDate = new Date(weekDates[weekDates.length - 1]);

  const firstDayOfYear = new Date(firstDate.getFullYear(), 0, 1);
  const diffInDays = Math.floor(
    (firstDate.getTime() - firstDayOfYear.getTime()) / (1000 * 60 * 60 * 24)
  );

  const firstDayOfWeek = (firstDayOfYear.getDay() + 6) % 7; // Adjust Sunday to be the last day of the week

  const weekNumber = Math.ceil((diffInDays - firstDayOfWeek + 1) / 7);

  // Adjust the week number if the last date falls on Sunday
  if (lastDate.getDay() === 0) {
    return weekNumber - 1;
  }

  return weekNumber;
}

/**
 * Moves the current calendar view forward based on the passed week dates
 */

export function moveWeekForward(weekDates: number[]) {
  const nextWeekDates: number[] = [];
  const interval = weekDates.length * 24 * 60 * 60 * 1000;
  weekDates.forEach((date) => nextWeekDates.push(date + interval));

  return nextWeekDates;
}

/**
 * Moves the current calendar view back based on the passed week dates
 */

export function moveWeekBack(weekDates: number[]) {
  const previousWeekDates: number[] = [];
  const interval = weekDates.length * 24 * 60 * 60 * 1000;
  weekDates.forEach((date) => previousWeekDates.push(date - interval));

  return previousWeekDates;
}

/**
 * Converts an array with dates, in miliseconds, to an array with string dates
 */
export function convertWeekDatesToStrings(datesArray: number[]) {
  return datesArray.map((date) => {
    const currentDate = new Date(date);
    const isoDate = currentDate.toISOString();
    const stringWeekDate = isoDate.slice(0, 10);
    return stringWeekDate;
  });
}

/**
 * Converts a string Date (YYYY-MM-DD) to a shorter string version of that passed date
 */
export function convertDateToShorthand(stringDate: string) {
  const date = new Date(stringDate);
  const day = date.toLocaleString('en', { weekday: 'short' }).toUpperCase();
  const dayOfMonth = date.getDate();

  return `${day} ${dayOfMonth}`;
}
