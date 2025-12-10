/**
 * Utility function for merging Tailwind CSS classes
 * Filters out falsy values and joins remaining classes
 *
 * @example
 * cn('base-class', condition && 'conditional-class', 'another-class')
 * // => 'base-class another-class' (if condition is false)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
