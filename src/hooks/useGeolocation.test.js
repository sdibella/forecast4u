import { renderHook, act, waitFor } from '@testing-library/react';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { useGeolocation } from './useGeolocation';
import { coordinatesToLocation } from '../utils/geocoding';

vi.mock('../utils/geocoding', () => ({
  coordinatesToLocation: vi.fn(),
}));

describe('useGeolocation', () => {
  const originalGeolocation = navigator.geolocation;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    Object.defineProperty(navigator, 'geolocation', {
      value: originalGeolocation,
      configurable: true,
    });
  });

  it('surfaces an error when geolocation is not supported', () => {
    Object.defineProperty(navigator, 'geolocation', {
      value: undefined,
      configurable: true,
    });

    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.detect();
    });

    expect(result.current.error).toBe('Geolocation is not supported by your browser.');
    expect(result.current.detecting).toBe(false);
  });

  it('stores the reverse-geocoded location and current coordinates on success', async () => {
    coordinatesToLocation.mockResolvedValue({
      name: 'New York',
      state: 'NY',
      zip: '10001',
    });

    const getCurrentPosition = vi.fn((onSuccess) => {
      onSuccess({
        coords: {
          latitude: 40.7128,
          longitude: -74.006,
        },
      });
    });

    Object.defineProperty(navigator, 'geolocation', {
      value: { getCurrentPosition },
      configurable: true,
    });

    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.detect();
    });

    await waitFor(() => expect(result.current.detecting).toBe(false));

    expect(coordinatesToLocation).toHaveBeenCalledWith(40.7128, -74.006);
    expect(getCurrentPosition).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      { enableHighAccuracy: false, timeout: 10000 }
    );
    expect(result.current.location).toEqual({
      name: 'New York',
      state: 'NY',
      zip: '10001',
      latitude: 40.7128,
      longitude: -74.006,
    });
    expect(result.current.error).toBeNull();
  });

  it('falls back to a generic location when reverse geocoding fails', async () => {
    coordinatesToLocation.mockRejectedValue(new Error('Reverse geocoding failed'));

    Object.defineProperty(navigator, 'geolocation', {
      value: {
        getCurrentPosition: (onSuccess) => {
          onSuccess({
            coords: {
              latitude: 41.8781,
              longitude: -87.6298,
            },
          });
        },
      },
      configurable: true,
    });

    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.detect();
    });

    await waitFor(() => expect(result.current.detecting).toBe(false));

    expect(result.current.location).toEqual({
      name: 'Your Location',
      latitude: 41.8781,
      longitude: -87.6298,
    });
  });

  it('sets an error message when the browser rejects geolocation access', () => {
    Object.defineProperty(navigator, 'geolocation', {
      value: {
        getCurrentPosition: (_onSuccess, onError) => {
          onError({ message: 'Permission denied' });
        },
      },
      configurable: true,
    });

    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.detect();
    });

    expect(result.current.error).toBe('Location access denied: Permission denied');
    expect(result.current.detecting).toBe(false);
  });
});
