import { useState, useCallback, useEffect } from 'react';

const THEME_KEY = 'forecast4u-theme';

/**
 * Custom hook for managing the Carbon theme (light/dark mode).
 * Persists preference and respects system preference.
 */
export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    // Check for stored preference
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === 'g100' || stored === 'white') return stored;
    } catch {
      // localStorage may not be available
    }

    // Fall back to system preference
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'g100';
    }
    return 'white';
  });

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'white' ? 'g100' : 'white';
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  }, []);

  const isDark = theme === 'g100';

  // Listen for system theme changes
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!mq) return;

    const handler = (e) => {
      try {
        const stored = localStorage.getItem(THEME_KEY);
        if (!stored) {
          setThemeState(e.matches ? 'g100' : 'white');
        }
      } catch {
        setThemeState(e.matches ? 'g100' : 'white');
      }
    };

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return { theme, isDark, toggleTheme };
}
