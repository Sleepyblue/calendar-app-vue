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
 * Outputs the current date as a string Date (YYYY-MM-DD)
 */
export function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Outputs the current week number, based on the provided date.
 */
export function getWeekNumber(date: number | string): number {
  const dateObj = new Date(date);
  dateObj.setHours(0, 0, 0, 0); // Set time to 00:00:00 to ensure consistency

  const firstDayOfYear = new Date(dateObj.getFullYear(), 0, 1);
  const daysOffset = (firstDayOfYear.getDay() + 6) % 7; // Number of days to adjust the start of the year

  const diffInDays = Math.floor(
    (dateObj.getTime() -
      firstDayOfYear.getTime() -
      daysOffset * 24 * 60 * 60 * 1000) /
      (24 * 60 * 60 * 1000)
  );

  const weekNumber = Math.ceil(diffInDays / 7) + 1; // Add 1 to account for Sunday belonging to the next week

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
 * Converts an array with dates, in miliseconds, to an array with string dates (YYYY-MM-DD)
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
 * Converts a string Date (YYYY-MM-DD) to a shorter string version of that passed date. E.g. "Thu, Feb 04"
 */
export function convertDateToShortForm(inputDate: string): string {
  const dateObj: Date = new Date(inputDate);
  const formattedDate: string = dateObj.toLocaleString('en-us', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return formattedDate;
}

/**
 * Converts a string Date (YYYY-MM-DD) to a shorter string version of that passed date. E.g. "MON 17"
 */
export function convertDateToShorthand(stringDate: string) {
  const date = new Date(stringDate);
  const day = date.toLocaleString('en', { weekday: 'short' }).toUpperCase();
  const dayOfMonth = date.getDate();

  return `${day} ${dayOfMonth}`;
}
