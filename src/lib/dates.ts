// Calendar dates are plain "YYYY-MM-DD" strings so time zones never shift them.

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

function toUtcMilliseconds(dateText: string): number {
  const [yearText, monthText, dayText] = dateText.split("-");
  return Date.UTC(Number(yearText), Number(monthText) - 1, Number(dayText));
}

export function getTodayInTimeZone(timeZone: string): string {
  // The "en-CA" locale formats dates as YYYY-MM-DD.
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(new Date());
}

export function isValidTimeZone(timeZone: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: timeZone });
    return true;
  } catch {
    return false;
  }
}

export function addDays(dateText: string, dayCount: number): string {
  const resultDate = new Date(toUtcMilliseconds(dateText) + dayCount * MILLISECONDS_PER_DAY);
  return resultDate.toISOString().slice(0, 10);
}

export function daysBetween(startDateText: string, endDateText: string): number {
  return Math.round((toUtcMilliseconds(endDateText) - toUtcMilliseconds(startDateText)) / MILLISECONDS_PER_DAY);
}

export function formatDateForDisplay(dateText: string): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return formatter.format(new Date(toUtcMilliseconds(dateText)));
}
