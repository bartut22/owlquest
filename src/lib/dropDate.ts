export const DROP_DATE = new Date("2026-08-16T00:00:00");

export function hasDropPassed() {
  return Date.now() >= DROP_DATE.getTime();
}
