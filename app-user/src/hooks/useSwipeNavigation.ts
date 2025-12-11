import { useEffect, useRef } from 'react';

interface SwipeNavigationOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
  enabled?: boolean;
}

export function useSwipeNavigation({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  enabled = true,
}: SwipeNavigationOptions) {
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const isTwoFingerGestureRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const handleTouchStart = (e: TouchEvent) => {
      // Check for two-finger gesture
      if (e.touches.length === 2) {
        isTwoFingerGestureRef.current = true;
        const touch = e.touches[0];
        touchStartRef.current = {
          x: touch.clientX,
          y: touch.clientY,
          time: Date.now(),
        };
      } else {
        isTwoFingerGestureRef.current = false;
        touchStartRef.current = null;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Continue tracking only if it's a two-finger gesture
      if (e.touches.length === 2 && isTwoFingerGestureRef.current) {
        const touch = e.touches[0];
        touchEndRef.current = {
          x: touch.clientX,
          y: touch.clientY,
          time: Date.now(),
        };
      }
    };

    const handleTouchEnd = () => {
      if (!touchStartRef.current || !touchEndRef.current || !isTwoFingerGestureRef.current) {
        touchStartRef.current = null;
        touchEndRef.current = null;
        isTwoFingerGestureRef.current = false;
        return;
      }

      const deltaX = touchEndRef.current.x - touchStartRef.current.x;
      const deltaY = touchEndRef.current.y - touchStartRef.current.y;
      const deltaTime = touchEndRef.current.time - touchStartRef.current.time;

      // Check if it's a horizontal swipe (not vertical)
      const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
      const isFastEnough = deltaTime < 300; // Must complete within 300ms

      if (isHorizontalSwipe && Math.abs(deltaX) > threshold && isFastEnough) {
        if (deltaX > 0 && onSwipeRight) {
          // Swipe right - go back
          onSwipeRight();
        } else if (deltaX < 0 && onSwipeLeft) {
          // Swipe left - go forward
          onSwipeLeft();
        }
      }

      // Reset
      touchStartRef.current = null;
      touchEndRef.current = null;
      isTwoFingerGestureRef.current = false;
    };

    // Mouse events for desktop trackpad gestures
    let mouseStartX = 0;
    let isMouseGesture = false;

    const handleMouseDown = (e: MouseEvent) => {
      // Check if it's a middle mouse button or has specific modifier keys for gestures
      if (e.button === 1) {
        isMouseGesture = true;
        mouseStartX = e.clientX;
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isMouseGesture) return;

      const deltaX = e.clientX - mouseStartX;

      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      }

      isMouseGesture = false;
    };

    // Listen to browser's native back/forward navigation
    const handlePopState = () => {
      // Browser navigation is handled automatically by React Router
      // This is just for additional tracking if needed
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [enabled, onSwipeLeft, onSwipeRight, threshold]);
}
