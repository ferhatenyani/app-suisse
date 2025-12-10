/**
 * Pluralization utility
 * Returns singular or plural form based on count
 *
 * @example
 * pluralize(1, 'item') // => 'item'
 * pluralize(5, 'item') // => 'items'
 * pluralize(2, 'person', 'people') // => 'people'
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural || `${singular}s`);
}

/**
 * Date formatting utility with error handling
 * Safely formats date strings with fallback for invalid dates
 *
 * @example
 * formatDate('2024-01-15') // => 'Jan 15, 2024'
 */
export function formatDate(
  dateString: string,
  options?: Intl.DateTimeFormatOptions
): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    return date.toLocaleDateString('en-US', options || {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch (error) {
    console.error('Invalid date:', dateString, error);
    return 'Invalid date';
  }
}

/**
 * Number formatting utility with locale support
 * Formats numbers with thousands separators
 *
 * @example
 * formatNumber(1234567) // => '1,234,567'
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Relative time formatter (e.g., "2 hours ago")
 * Converts date to human-readable relative time
 *
 * @example
 * formatRelativeTime(new Date(Date.now() - 3600000)) // => '1 hour ago'
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${pluralize(minutes, 'minute')} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${pluralize(hours, 'hour')} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${pluralize(days, 'day')} ago`;
  } else {
    return formatDate(dateObj.toISOString());
  }
}

/**
 * Truncate text with ellipsis
 *
 * @example
 * truncate('Long text here', 10) // => 'Long text...'
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}
