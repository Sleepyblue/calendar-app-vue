export interface DayEvent {
  id: string;
  date: string;
  title: string;
  startHour: number;
  endHour: number;
}

export interface CalendarEvents {
  weekNumber: number;
  events: DayEvent[];
}
