import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '../utils/constants';

export type BreakpointKey = keyof typeof BREAKPOINTS;

export interface UseBreakpointReturn {
  breakpoint: BreakpointKey;
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2Xl: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
}

/**
 * Hook to detect current responsive breakpoint
 * Provides boolean helpers for common breakpoint checks
 *
 * @example
 * const { isMobile, isDesktop, breakpoint } = useBreakpoint();
 * if (isMobile) { ... }
 */
export function useBreakpoint(): UseBreakpointReturn {
  const [breakpoint, setBreakpoint] = useState<BreakpointKey>('XS');
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setWidth(currentWidth);

      if (currentWidth >= BREAKPOINTS['2XL']) {
        setBreakpoint('2XL');
      } else if (currentWidth >= BREAKPOINTS.XL) {
        setBreakpoint('XL');
      } else if (currentWidth >= BREAKPOINTS.LG) {
        setBreakpoint('LG');
      } else if (currentWidth >= BREAKPOINTS.MD) {
        setBreakpoint('MD');
      } else if (currentWidth >= BREAKPOINTS.SM) {
        setBreakpoint('SM');
      } else {
        setBreakpoint('XS');
      }
    };

    // Initialize on mount
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    breakpoint,
    isXs: breakpoint === 'XS',
    isSm: breakpoint === 'SM',
    isMd: breakpoint === 'MD',
    isLg: breakpoint === 'LG',
    isXl: breakpoint === 'XL',
    is2Xl: breakpoint === '2XL',
    isMobile: breakpoint === 'XS' || breakpoint === 'SM',
    isTablet: breakpoint === 'MD',
    isDesktop: breakpoint === 'LG' || breakpoint === 'XL' || breakpoint === '2XL',
    width,
  };
}
