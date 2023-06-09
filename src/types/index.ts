export interface DayEvent {
  id: string;
  eventName: string;
  eventHour: string;
}

export interface CalendarEvent {
  date: string;
  events?: DayEvent[];
}
