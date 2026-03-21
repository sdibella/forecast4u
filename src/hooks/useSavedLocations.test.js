import { renderHook, act } from '@testing-library/react';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { useSavedLocations } from './useSavedLocations';

const STORAGE_KEY = 'forecast4u-saved-locations';

describe('useSavedLocations', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', window.localStorage);
    window.localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-21T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('loads saved locations from localStorage on first render', () => {
    const storedLocations = [
      { zip: '10001', name: 'New York', state: 'NY', lastVisited: 123 },
    ];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storedLocations));

    const { result } = renderHook(() => useSavedLocations());

    expect(result.current.locations).toEqual(storedLocations);
  });

  it('adds locations, de-duplicates existing zips, and limits the list to eight entries', () => {
    const { result } = renderHook(() => useSavedLocations());

    act(() => {
      Array.from({ length: 9 }).forEach((_, index) => {
        const number = index + 1;
        result.current.addLocation(`0000${number}`, `City ${number}`, 'ST');
      });
    });

    act(() => {
      result.current.addLocation('00005', 'Updated City', 'NY');
    });

    expect(result.current.locations).toHaveLength(8);
    expect(result.current.locations[0]).toMatchObject({
      zip: '00005',
      name: 'Updated City',
      state: 'NY',
    });
    expect(result.current.locations.filter((location) => location.zip === '00005')).toHaveLength(1);
    expect(result.current.locations.map((location) => location.zip)).not.toContain('00001');

    const persistedLocations = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    expect(persistedLocations).toEqual(result.current.locations);
  });

  it('removes a saved location and clears all saved locations', () => {
    const { result } = renderHook(() => useSavedLocations());

    act(() => {
      result.current.addLocation('10001', 'New York', 'NY');
      result.current.addLocation('60601', 'Chicago', 'IL');
    });

    act(() => {
      result.current.removeLocation('10001');
    });

    expect(result.current.locations).toEqual([
      expect.objectContaining({ zip: '60601', name: 'Chicago' }),
    ]);

    act(() => {
      result.current.clearLocations();
    });

    expect(result.current.locations).toEqual([]);
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
