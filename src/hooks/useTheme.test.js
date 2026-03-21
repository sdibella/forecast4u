import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useTheme } from './useTheme';

const STORAGE_KEY = 'forecast4u-theme';

function createMatchMedia(matches = false) {
  let changeListener;

  return {
    matches,
    media: '(prefers-color-scheme: dark)',
    addEventListener: vi.fn((eventName, listener) => {
      if (eventName === 'change') {
        changeListener = listener;
      }
    }),
    removeEventListener: vi.fn((eventName, listener) => {
      if (eventName === 'change' && changeListener === listener) {
        changeListener = undefined;
      }
    }),
    dispatch(nextMatches) {
      this.matches = nextMatches;
      changeListener?.({ matches: nextMatches });
    },
  };
}

describe('useTheme', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', window.localStorage);
    window.localStorage.clear();
  });

  it('uses the stored theme when one is available', () => {
    window.localStorage.setItem(STORAGE_KEY, 'g100');
    const matchMedia = createMatchMedia(false);
    window.matchMedia = vi.fn(() => matchMedia);

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('g100');
    expect(result.current.isDark).toBe(true);
  });

  it('falls back to the system color preference when no stored theme exists', () => {
    const matchMedia = createMatchMedia(true);
    window.matchMedia = vi.fn(() => matchMedia);

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('g100');
    expect(result.current.isDark).toBe(true);
  });

  it('toggles the theme and persists the new value', () => {
    const matchMedia = createMatchMedia(false);
    window.matchMedia = vi.fn(() => matchMedia);

    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('g100');
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('g100');
  });

  it('reacts to system theme changes only when no stored preference exists', () => {
    const matchMedia = createMatchMedia(false);
    window.matchMedia = vi.fn(() => matchMedia);

    const { result } = renderHook(() => useTheme());

    act(() => {
      matchMedia.dispatch(true);
    });

    expect(result.current.theme).toBe('g100');

    window.localStorage.setItem(STORAGE_KEY, 'white');

    act(() => {
      matchMedia.dispatch(false);
    });

    expect(result.current.theme).toBe('g100');
  });
});
