export function getTimeString(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  if (diff < 60 * 1000) {
    // less than 1 minute ago
    return Math.floor(diff / 1000) + 's';
  } else if (diff < 60 * 60 * 1000) {
    // less than 1 hour ago
    return Math.floor(diff / (60 * 1000)) + 'm';
  } else if (diff < 24 * 60 * 60 * 1000) {
    // less than 1 day ago
    return Math.floor(diff / (60 * 60 * 1000)) + 'h';
  } else {
    // more than 1 day ago
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
}

export function pluralString(count: number, word: string): string {
  if (count === 1) {
    return word;
  } else {
    return word + 's';
  }
}
