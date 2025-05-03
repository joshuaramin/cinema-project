export function ConvertISODuration(duration: string) {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return "";

  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}mins`);

  return parts.join(" ");
}