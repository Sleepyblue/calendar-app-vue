export interface DayEvent {
  eventName: string;
  eventHour: string;
}

export interface CalendarEvent {
  date: string;
  events?: DayEvent[];
}
