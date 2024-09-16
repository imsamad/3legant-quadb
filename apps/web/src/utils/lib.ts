export function humaniseDateObject(time: Date) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  return time.toLocaleString('en-US', options);
}

export const extractDMY = (time: Date) => {
  return time.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', // Full month name
    day: '2-digit', // Ensures two digits for the day
  });
  // Extract day, month, and year
  const day = time.getDate();
  const month = time.getMonth() + 1; // Months are 0-based in JavaScript, so add 1
  const year = time.getFullYear();
  return `${day} ${month}, ${year}`;
};
