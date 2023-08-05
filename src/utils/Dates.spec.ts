import {
  getWeekDates,
  getCurrentDate,
  getWeekNumber,
  moveWeekForward,
  moveWeekBack,
  convertWeekDatesToStrings,
  convertDateToShortForm,
  convertDateToShorthand,
} from './Dates';

describe('Dates', () => {
  beforeEach(() => {
    vi.useFakeTimers();

    const mockDate = new Date(2023, 0, 1);
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('getWeekDates', () => {
    it('should output the current week dates in milliseconds', () => {
      const currentWeekMock = [
        1672012800000, 1672099200000, 1672185600000, 1672272000000,
        1672358400000, 1672444800000, 1672531200000,
      ];

      const currentWeek = getWeekDates();

      expect(currentWeek).toEqual(expect.arrayContaining(currentWeekMock));
    });

    it("should output the current week's seven days as default", () => {
      const currentWeek = getWeekDates();

      expect(currentWeek.length).toBe(7);
    });

    it.each([1, 2, 3, 4, 5, 6, 7])(
      "should output the current week's %i days",
      (dayNumber) => {
        const currentWeek = getWeekDates(dayNumber);

        expect(currentWeek.length).toBe(dayNumber);
      },
    );
  });

  describe('getCurrentDate', () => {
    it("should output the current day's date as a string", () => {
      const currentDate = getCurrentDate();

      expect(currentDate).toEqual('2023-01-01');
    });
  });

  describe('getCurrentWeekNumber', () => {
    it('should output the current week number passing the current date as a string', () => {
      const currentWeekNumber = getWeekNumber('2023-01-01');

      expect(currentWeekNumber).toBe(1);
    });

    it('should output the current week number passing the current date as a number (milliseconds)', () => {
      const currentWeekNumber = getWeekNumber(1672531200000);

      expect(currentWeekNumber).toBe(1);
    });
  });

  describe('moveWeekForward', () => {
    it('should output the next week in milliseconds', () => {
      const nextWeekMock = [
        1672617600000, 1672704000000, 1672790400000, 1672876800000,
        1672963200000, 1673049600000, 1673136000000,
      ];

      const currentWeek = getWeekDates();
      const nextWeek = moveWeekForward(currentWeek);

      console.log(getCurrentDate());
      expect(currentWeek).not.toEqual(expect.arrayContaining(nextWeekMock));
      expect(nextWeek).toEqual(expect.arrayContaining(nextWeekMock));
    });
  });

  describe('moveWeekBack', () => {
    it('should output the previous week in milliseconds', () => {
      const previousWeekMock = [
        1671408000000, 1671494400000, 1671580800000, 1671667200000,
        1671753600000, 1671840000000, 1671926400000,
      ];

      const currentWeek = getWeekDates();
      const previousWeek = moveWeekBack(currentWeek);

      expect(currentWeek).not.toEqual(expect.arrayContaining(previousWeekMock));
      expect(previousWeek).toEqual(expect.arrayContaining(previousWeekMock));
    });
  });

  describe('convertDatesToStrings', () => {
    it('should convert an array with dates in milliseconds to an array with string dates', () => {
      const stringDatesMock = [
        '2022-12-26',
        '2022-12-27',
        '2022-12-28',
        '2022-12-29',
        '2022-12-30',
        '2022-12-31',
        '2023-01-01',
      ];

      const currentWeek = getWeekDates();
      const weekStringDates = convertWeekDatesToStrings(currentWeek);

      expect(weekStringDates).toEqual(expect.arrayContaining(stringDatesMock));
    });
  });

  describe('convertDateToShortForm', () => {
    it('should convert a string Date to a shorter version', () => {
      const shortDate = convertDateToShortForm('2023-01-01');
      expect(shortDate).toEqual('Sun, Jan 1');
    });
  });

  describe('convertDateToShorthand', () => {
    it('should convert a string Date to its shorthand version', () => {
      const shortHand = convertDateToShorthand('2023-01-01');
      expect(shortHand).toEqual('SUN 1');
    });
  });
});
