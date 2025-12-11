import { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigationHistory } from '../../hooks/useNavigationHistory';
import { useSwipeNavigation } from '../../hooks/useSwipeNavigation';

interface NavigationControlsProps {
  className?: string;
  showLabels?: boolean;
}

export function NavigationControls({ className = '', showLabels = false }: NavigationControlsProps) {
  const { goBack, goForward, canGoBack, canGoForward } = useNavigationHistory();

  // Enable swipe gestures for navigation
  useSwipeNavigation({
    onSwipeRight: goBack,
    onSwipeLeft: goForward,
    enabled: true,
  });

  // Listen for keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + Left Arrow = Back
      if (e.altKey && e.key === 'ArrowLeft' && canGoBack) {
        e.preventDefault();
        goBack();
      }
      // Alt + Right Arrow = Forward
      if (e.altKey && e.key === 'ArrowRight' && canGoForward) {
        e.preventDefault();
        goForward();
      }
      // Backspace = Back (common browser behavior)
      if (e.key === 'Backspace' && canGoBack && !isInputFocused()) {
        e.preventDefault();
        goBack();
      }
    };

    const isInputFocused = () => {
      const activeElement = document.activeElement;
      return (
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        (activeElement instanceof HTMLElement && activeElement.isContentEditable)
      );
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canGoBack, canGoForward, goBack, goForward]);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        onClick={goBack}
        disabled={!canGoBack}
        className={`
          flex items-center gap-1 px-2 py-1.5 rounded-lg
          transition-all duration-200
          ${canGoBack
            ? 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-pointer'
            : 'text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50'
          }
        `}
        title="Go back (Alt + ← or swipe right with 2 fingers)"
        aria-label="Go back"
      >
        <ChevronLeft className="w-5 h-5" />
        {showLabels && <span className="text-sm font-medium">Back</span>}
      </button>

      <button
        onClick={goForward}
        disabled={!canGoForward}
        className={`
          flex items-center gap-1 px-2 py-1.5 rounded-lg
          transition-all duration-200
          ${canGoForward
            ? 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-pointer'
            : 'text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50'
          }
        `}
        title="Go forward (Alt + → or swipe left with 2 fingers)"
        aria-label="Go forward"
      >
        <ChevronRight className="w-5 h-5" />
        {showLabels && <span className="text-sm font-medium">Forward</span>}
      </button>
    </div>
  );
}
