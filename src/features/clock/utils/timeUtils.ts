export function getTimeInTZ(date: Date, tz: string) {
  const options: Intl.DateTimeFormatOptions = {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: tz,
  };
  const parts = new Intl.DateTimeFormat("en-US", options).formatToParts(date);
  const timeParts: { [key: string]: number } = {};
  parts.forEach((p) => {
    if (p.type !== "literal") timeParts[p.type] = parseInt(p.value, 10);
  });
  return timeParts;
}

export function getUTCOffset(timeZone: string, date: Date = new Date()) {
  const tzDate = new Date(
    date.toLocaleString("en-US", { timeZone, hour12: false }),
  );
  return (tzDate.getTime() - date.getTime()) / (1000 * 60 * 60);
}
