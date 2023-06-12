export interface DayEvent {
  id: string;
  date: string;
  title: string;
  hour: string;
}

export interface CalendarEvent {
  week?: {
    number: number;
    events: DayEvent[];
  };
}
