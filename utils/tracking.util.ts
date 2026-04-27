export function generateTrackingId(): string {
  const now = new Date();

  const dateStr = now
    .toISOString()
    .slice(2, 16)
    .replace(/[-T:.]/g, '');

  const randomPart = Math.random()
    .toString(36)
    .substring(2, 6)
    .toUpperCase();

  return `QA${dateStr}${randomPart}`.slice(0, 16);
}