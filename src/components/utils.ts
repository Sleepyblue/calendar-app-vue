export function getCurrentDates(days: number = 7, toString: boolean = false) {
  let currentDates = [];

  for (let i = 0; i <= days - 1; i++) {
    const currentDate = new Date();
    const currentDay = currentDate.getDay() === 0 ? 7 : currentDate.getDay();
    const day = currentDate.setDate(
      currentDate.getDate() + (days === 7 ? -currentDay + i + 1 : +i)
    );

    currentDates.push(
      toString ? new Date(day).toISOString().slice(0, 10) : day
    );
  }

  return currentDates;
}

export function setDateInterval(
  datesArray: number[],
  forward: boolean = false,
  toString: boolean = false
) {
  const copyDatesArray: (string | number)[] = [];
  const interval = datesArray.length * 24 * 60 * 60 * 1000;
  datesArray.forEach((date) => {
    if (toString)
      copyDatesArray.push(
        new Date((date as number) + (forward ? +interval : -interval))
          .toISOString()
          .slice(0, 10)
      );
    else
      copyDatesArray.push((date as number) + (forward ? +interval : -interval));
  });
  return copyDatesArray;
}

export function convertToReadableWeekDates(
  currentWeek: string[],
  shortHand?: boolean
) {
  let readableWeekDates: string[] = [];

  const options: {} = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  currentWeek.forEach((date) => {
    let shortDay;
    const fullDay = new Date(date).toLocaleDateString('en-GB', options);
    if (shortHand)
      shortDay = fullDay.slice(0, 3).toUpperCase() + ' ' + date.slice(-2);
    readableWeekDates.push(shortDay || fullDay);
  });
  return readableWeekDates;
}

// TODO: Initial brainstorming for week change
const today = new Date();
// const lastWeek = new Date(today.setDate(today.getDate() - 7)).toISOString();
const lastWeek = new Date(today.setDate(today.getDate() - 7));
