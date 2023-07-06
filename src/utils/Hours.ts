export function formatHoursRange(
  startHour: number,
  endHour: number,
  use12HourFormat: boolean,
): string {
  const formatHour = use12HourFormat ? formatHour12 : formatHour24;

  const formattedStart = formatHour(startHour);
  const formattedEnd = formatHour(endHour);
  const formatFinal =
    formattedStart === formattedEnd
      ? formattedStart
      : `${formattedStart} - ${formattedEnd}`;

  return formatFinal;
}

export function formatHour12(hour: number): string {
  const isAM = hour < 12;
  const formattedHour = hour % 12 || 12;
  const minutes = '00'; // Default minutes to ":00"

  if (hour % 1 !== 0) {
    const decimalPart = hour % 1;
    const formattedMinutes = Math.round(decimalPart * 60)
      .toString()
      .padStart(2, '0');
    minutes.replace('00', `${formattedMinutes}`);
  }

  return `${formattedHour}:${minutes} ${isAM ? 'AM' : 'PM'}`;
}

export function formatHour24(hour: number): string {
  const formattedHour = Math.floor(hour).toString().padStart(2, '0');
  const minutes = (hour % 1) * 60 || '00';
  return `${formattedHour}:${minutes} - ${formattedHour}:${minutes}`;
}

type Mode = 'start' | 'end';

export function getCurrentFormattedHour(mode: Mode): string {
  const currentHour = new Date().getHours();
  let formattedHour: string;

  if (mode === 'start') {
    formattedHour = `${currentHour % 12}:00 ${currentHour < 12 ? 'AM' : 'PM'}`;
  } else if (mode === 'end') {
    formattedHour = `${(currentHour + 1) % 12}:00 ${
      currentHour < 11 ? 'AM' : 'PM'
    }`;
  } else {
    throw new Error('Invalid mode. Please provide either "start" or "end".');
  }

  return formattedHour;
}

export function getCurrentHour(mode: Mode): number {
  const currentHour = new Date().getHours();
  let hour: number;

  if (mode === 'start') {
    hour = currentHour;
  } else if (mode === 'end') {
    hour = (currentHour + 1) % 24;
  } else {
    throw new Error('Invalid mode. Please provide either "start" or "end".');
  }

  return hour;
}
