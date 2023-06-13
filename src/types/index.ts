export interface DayEvent {
  id: string;
  date: string;
  title: string;
  hour: number;
}

export interface CalendarEvents {
  weekNumber: number;
  events: DayEvent[];
}
