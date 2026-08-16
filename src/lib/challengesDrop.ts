export const CHALLENGES_DROP_DATE = new Date("2026-08-16T00:00:00");

export function getChallengesTimeLeft() {
  const now = new Date();
  const diff = CHALLENGES_DROP_DATE.getTime() - now.getTime();

  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export function hasChallengesTimerFinished() {
  return getChallengesTimeLeft() === null;
}
