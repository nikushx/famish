import { DateTime } from "luxon";
import _ from "lodash";

export type HourMinute = {
  hour: number;
  minute: number;
};

export type WeekPoint = HourMinute & {
  weekday: number;
};

export type WeekInterval = {
  start: WeekPoint;
  end: WeekPoint;
};

export type Deal = {
  title: string;
  description: string;
  url?:string;
  times: Array<WeekInterval>;
  // menuItems: Array<{
  // 	name: string;
  // 	price: string;
  // }>;
};

export type Deals = Array<Deal>;

export type Place = {
  name: string;
  url?: string;
  deals: Deals;
};

export type Places = Array<Place>;

export const checkInterval = (
  interval: WeekInterval,
  time: DateTime
): boolean => {
  let isValid = false;

  const startHour = interval.start.hour;
  const endHour = interval.end.hour;

  const validWeekdays = checkWeekdays(
    interval.start.weekday,
    interval.end.weekday,
    time.weekday
  );

  const validHours = checkHours(
    interval.start.hour,
    interval.end.hour,
    time.hour
  );

  // to check minutes, we only need to falsify if start or end hour match the current hour, in which case we check minutes
  let validMinutes = true;
  if (startHour === time.hour || endHour === time.hour) {
    if (startHour === endHour) {
      validMinutes =
        checkMins(interval.start.minute, time.minute) &&
        checkMins(interval.end.minute, time.minute, true);
    } else {
      validMinutes =
        startHour === time.hour
          ? checkMins(interval.start.minute, time.minute)
          : checkMins(interval.end.minute, time.minute, true);
    }
  }

  return validWeekdays && validHours && validMinutes;
};

const getNumberArrayFromRange = (
  start: number,
  end: number,
  modulo: number,
  offsetBy = 1
) =>
  end === start
    ? [start]
    : end > start
    ? _.range(start, end + 1, 1)
    : _.range(start, modulo + end, 1)
        .map(weekday => (weekday % modulo) + offsetBy)
        .sort();

const checkWeekdays = (startDay: number, endDay: number, currentDay: number) =>
  getNumberArrayFromRange(startDay, endDay, 7).indexOf(currentDay) !== -1;

const checkHours = (startHour: number, endHour: number, currentHour: number) =>
  getNumberArrayFromRange(startHour, endHour, 30).indexOf(currentHour) !== -1;

// const checkMins = (startMin: number, endMin: number, currentMin: number) =>
// 	getNumberArrayFromRange(startMin, endMin, 60).indexOf(currentMin) !== -1;

// check if current minute is after the interval minute, or reverse
// lets beginning minute in, not end last.
const checkMins = (
  intervalMin: number,
  currentMin: number,
  reverse = false
): boolean => {
  return !reverse ? currentMin >= intervalMin : currentMin < intervalMin;
};
