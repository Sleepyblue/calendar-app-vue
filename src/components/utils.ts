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

export function setCurrentDates(
  datesArray: number[],
  forward: boolean = false
) {
  const copyDatesArray: (string | number)[] = [];
  const interval = datesArray.length * 24 * 60 * 60 * 1000;
  datesArray.forEach((date) =>
    copyDatesArray.push((date as number) + (forward ? +interval : -interval))
  );
  return copyDatesArray;
}

export function convertToStringDates(
  datesArray: (string | number)[],
  shortHand?: boolean
) {
  const stringsWeekArray: string[] = [];
  let readableWeekDates: string[] = [];

  datesArray.forEach((date) => {
    if (typeof date === 'number') {
      stringsWeekArray.push(new Date(date).toISOString().slice(0, 10));
    } else {
      stringsWeekArray.push(date);
    }
  });

  const options: {} = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  stringsWeekArray.forEach((date) => {
    let shortDay;
    const fullDay = new Date(date).toLocaleDateString('en-GB', options);
    if (shortHand)
      shortDay = fullDay.slice(0, 3).toUpperCase() + ' ' + date.slice(-2);
    readableWeekDates.push(shortDay || fullDay);
  });

  return readableWeekDates;
}
