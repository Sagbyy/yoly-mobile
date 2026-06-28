const FR_WEEKDAYS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

export function formatThousands(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatHoursMinutes(totalMinutes: number): string {
  const minutes = Math.max(0, Math.round(totalMinutes));
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest}m`;
  return `${hours}h ${rest.toString().padStart(2, "0")}m`;
}

export function formatClock(totalMinutes: number): string {
  const minutes = Math.max(0, Math.round(totalMinutes));
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return `${hours}:${rest.toString().padStart(2, "0")}`;
}

export function formatTimeOfDay(value: string, tz?: string): string {
  if (/^\d{1,2}:\d{2}/.test(value)) {
    const [h, m] = value.split(":");
    return `${h.padStart(2, "0")}:${m.slice(0, 2)}`;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: tz,
    }).format(date);
  } catch {
    return value;
  }
}

export function formatWeekday(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return FR_WEEKDAYS[date.getUTCDay()];
}

export function formatKilometers(meters: number): string {
  return (meters / 1000).toFixed(1);
}

export function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function sampleEvenly<T>(items: T[], count: number): T[] {
  if (count <= 0) return [];
  if (items.length <= count) return items;
  const step = (items.length - 1) / (count - 1);
  const result: T[] = [];
  for (let i = 0; i < count; i += 1) {
    result.push(items[Math.round(i * step)]);
  }
  return result;
}
