import { renderHook, act, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useWeather } from './useWeather';
import { fetchForecast } from '../utils/weatherApi';
import { zipToCoordinates } from '../utils/geocoding';

vi.mock('../utils/weatherApi', () => ({
  fetchForecast: vi.fn(),
}));

vi.mock('../utils/geocoding', () => ({
  zipToCoordinates: vi.fn(),
}));

describe('useWeather', () => {
  const mockLocation = {
    latitude: 40.7128,
    longitude: -74.006,
    name: 'New York',
    state: 'NY',
    timezone: 'America/New_York',
  };

  const mockForecast = {
    current: { temperature: 72 },
    forecastByDay: [{ date: '2026-03-21', intervals: [] }],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('stops loading immediately when no ZIP code is provided', async () => {
    const { result } = renderHook(() => useWeather(''));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(zipToCoordinates).not.toHaveBeenCalled();
    expect(fetchForecast).not.toHaveBeenCalled();
    expect(result.current.data).toBeNull();
  });

  it('fetches coordinates first and then the forecast data', async () => {
    zipToCoordinates.mockResolvedValue(mockLocation);
    fetchForecast.mockResolvedValue(mockForecast);

    const { result } = renderHook(() => useWeather('10001'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(zipToCoordinates).toHaveBeenCalledWith('10001');
    expect(fetchForecast).toHaveBeenCalledWith(40.7128, -74.006, 'America/New_York');
    expect(result.current.location).toEqual(mockLocation);
    expect(result.current.data).toEqual(mockForecast);
    expect(result.current.error).toBeNull();
  });

  it('captures and exposes request errors', async () => {
    zipToCoordinates.mockRejectedValue(new Error('Could not find location for ZIP code: 99999'));

    const { result } = renderHook(() => useWeather('99999'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Could not find location for ZIP code: 99999');
    expect(result.current.data).toBeNull();
  });

  it('supports a manual refetch', async () => {
    zipToCoordinates.mockResolvedValue(mockLocation);
    fetchForecast.mockResolvedValue(mockForecast);

    const { result } = renderHook(() => useWeather('10001'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.refetch();
    });

    expect(zipToCoordinates).toHaveBeenCalledTimes(2);
    expect(fetchForecast).toHaveBeenCalledTimes(2);
  });
});
