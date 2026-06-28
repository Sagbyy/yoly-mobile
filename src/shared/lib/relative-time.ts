export function formatRelativeTime(value: string, now: number = Date.now()): string {
  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) return "";

  const diff = now - timestamp;
  if (diff < 60_000) return "à l'instant";

  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `il y a ${minutes} min`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;

  const days = Math.floor(hours / 24);
  return `il y a ${days} j`;
}
