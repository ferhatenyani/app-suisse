import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

interface NavigationState {
  canGoBack: boolean;
  canGoForward: boolean;
}

export function useNavigationHistory() {
  const navigate = useNavigate();
  const location = useLocation();
  const [navigationState, setNavigationState] = useState<NavigationState>({
    canGoBack: false,
    canGoForward: false,
  });

  // Track navigation history manually since History API doesn't expose this directly
  const historyStackRef = useRef<string[]>([location.pathname]);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const currentPath = location.pathname;
    const currentIndex = currentIndexRef.current;
    const stack = historyStackRef.current;

    // Check if this is a new navigation (not back/forward)
    if (stack[currentIndex] !== currentPath) {
      // Remove any forward history when navigating to a new page
      historyStackRef.current = [...stack.slice(0, currentIndex + 1), currentPath];
      currentIndexRef.current = currentIndex + 1;
    }

    // Update can go back/forward state
    setNavigationState({
      canGoBack: currentIndexRef.current > 0,
      canGoForward: currentIndexRef.current < historyStackRef.current.length - 1,
    });
  }, [location.pathname]);

  const goBack = () => {
    if (navigationState.canGoBack) {
      currentIndexRef.current--;
      navigate(-1);
    }
  };

  const goForward = () => {
    if (navigationState.canGoForward) {
      currentIndexRef.current++;
      navigate(1);
    }
  };

  return {
    goBack,
    goForward,
    canGoBack: navigationState.canGoBack,
    canGoForward: navigationState.canGoForward,
  };
}
