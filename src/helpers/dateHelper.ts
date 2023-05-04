export function dateDifference(date1: Date, date2: Date) {
  // Calculate the difference in milliseconds
  const diffInMilliseconds = Math.abs(date1.getTime() - date2.getTime());

  const units = [
    { name: 'years', divisor: 1000 * 60 * 60 * 24 * 365.25 },
    { name: 'months', divisor: 1000 * 60 * 60 * 24 * 30.44 },
    { name: 'w', divisor: 1000 * 60 * 60 * 24 * 7 },
    { name: 'd', divisor: 1000 * 60 * 60 * 24 },
    { name: 'h', divisor: 1000 * 60 * 60 },
    { name: 'min', divisor: 1000 * 60 },
  ];

  for (const unit of units) {
    const value = diffInMilliseconds / unit.divisor;
    if (value >= 1) {
      return `${Math.floor(value)} ${unit.name}`;
    }
  }

  // If the difference is less than a minute, return the value in milliseconds
  return `${diffInMilliseconds} ms`;
}
