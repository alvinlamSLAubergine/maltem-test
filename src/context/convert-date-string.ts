export function convertDateString(date: Date) {
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  const time = date.toLocaleTimeString('default', { hour12: true });
  return `${day} ${month} ${year} ${time}`;
}
