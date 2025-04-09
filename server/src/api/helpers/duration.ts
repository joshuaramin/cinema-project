export const DurationISO = (minutes: string) => {
  const hours = Math.floor(parseInt(minutes) / 60);
  const mins = parseInt(minutes) % 60;

  return `PT${hours > 0 ? `${hours}H` : ""}${mins > 0 ? `${mins}M` : ""}`;
};
