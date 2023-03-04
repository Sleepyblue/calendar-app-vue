/**
 * Outputs an array with dates, comprising the chosen interval, based on current date
 */
export function getCurrentDates(days: number = 7) {
  let currentDates = [];

  for (let i = 0; i <= days - 1; i++) {
    const currentDate = new Date();
    const currentDay = currentDate.getDay() === 0 ? 7 : currentDate.getDay();
    const day = currentDate.setDate(
      currentDate.getDate() + (days === 7 ? -currentDay + i + 1 : +i)
    );
    currentDates.push(day);
  }

  return currentDates;
}

/**
 * Moves the current calendar view, back and forth, based on the passed interval
 */
export function setCurrentDates(
  datesArray: number[],
  forward: boolean = false
) {
  const copyDatesArray: number[] = [];
  const interval = datesArray.length * 24 * 60 * 60 * 1000;
  datesArray.forEach((date) =>
    copyDatesArray.push(date + (forward ? +interval : -interval))
  );

  return copyDatesArray;
}

/**
 * Converts an array with dates, in miliseconds, to an array with string dates
 */
export function convertToStringDates(
  datesArray: number[],
  isoDate?: boolean,
  shortHand?: boolean
) {
  const stringsWeekArray: string[] = [];
  const options: {} = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  datesArray.forEach((date) => {
    let dateLocale = new Date(date).toLocaleDateString('en-GB', options);
    let dateISO = new Date(date).toISOString().slice(0, 10);

    if (shortHand) {
      stringsWeekArray.push(
        dateLocale.slice(0, 3).toUpperCase() + ' ' + dateISO.slice(-2)
      );
      return;
    } else if (isoDate) {
      stringsWeekArray.push(dateISO);
      return;
    } else {
      stringsWeekArray.push(dateLocale);
      return;
    }
  });

  return stringsWeekArray;
}
