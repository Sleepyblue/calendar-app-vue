export function getCurrentWeekDates(currentDate = new Date()) {
  let currentWeek = [];
  for (let i = 0; i <= 6; i++) {
    const currentDay = currentDate.getDay() === 0 ? 7 : currentDate.getDay();
    const day = currentDate.setDate(currentDate.getDate() - currentDay + i + 1);
    currentWeek.push(new Date(day).toISOString().slice(0, 10));
  }
  return currentWeek;
}

export function convertToReadableWeekDates(currentWeekArray: string[]) {
  let currentReadableWeek: string[] = [];
  const options: {} = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  currentWeekArray.forEach((date) => {
    const readableDay = new Date(date).toLocaleDateString('en-GB', options);
    currentReadableWeek.push(readableDay);
  });
  return currentReadableWeek;
}

// TODO: Initial brainstorming for week change
const today = new Date();
// const lastWeek = new Date(today.setDate(today.getDate() - 7)).toISOString();
const lastWeek = new Date(today.setDate(today.getDate() - 7));
