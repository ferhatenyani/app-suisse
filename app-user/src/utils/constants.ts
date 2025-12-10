/**
 * Z-Index scale for consistent layering
 * Use these constants instead of hardcoded z-index values
 */
export const Z_INDEX = {
  BASE: 0,
  DROPDOWN: 10,
  STICKY: 20,
  FIXED: 30,
  MODAL_BACKDROP: 40,
  MODAL: 50,
  TOAST: 100,
} as const;

/**
 * Responsive breakpoints matching Tailwind configuration
 * Use for JavaScript-based responsive logic
 */
export const BREAKPOINTS = {
  XS: 480,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

/**
 * Animation duration constants
 * Use for consistent timing across the app
 */
export const ANIMATION_DURATION = {
  FAST: 150,
  BASE: 200,
  SLOW: 300,
} as const;

/**
 * Common routes
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/app/dashboard',
  REPORTS: '/app/reports',
  TEAM: '/app/team',
  PROFILE: '/app/profile',
} as const;
