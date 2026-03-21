import { describe, it, expect, vi, beforeEach } from 'vitest';
import { zipToCoordinates } from './geocoding';

describe('zipToCoordinates', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('throws for invalid ZIP code format', async () => {
    await expect(zipToCoordinates('abc')).rejects.toThrow('Invalid ZIP code');
    await expect(zipToCoordinates('123')).rejects.toThrow('Invalid ZIP code');
    await expect(zipToCoordinates('123456')).rejects.toThrow('Invalid ZIP code');
    await expect(zipToCoordinates('')).rejects.toThrow('Invalid ZIP code');
  });

  it('accepts valid 5-digit ZIP code format', async () => {
    // Mock a successful fetch response
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          results: [
            {
              latitude: 40.7128,
              longitude: -74.006,
              name: 'New York',
              admin1: 'New York',
              country_code: 'US',
              country: 'United States',
              timezone: 'America/New_York',
            },
          ],
        }),
    });

    const result = await zipToCoordinates('10001');
    expect(result).toHaveProperty('latitude');
    expect(result).toHaveProperty('longitude');
    expect(result).toHaveProperty('name');
  });

  it('caches results for repeated lookups', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          results: [
            {
              latitude: 34.0522,
              longitude: -118.2437,
              name: 'Los Angeles',
              admin1: 'California',
              country_code: 'US',
              country: 'United States',
              timezone: 'America/Los_Angeles',
            },
          ],
        }),
    });

    // First call - fetches from API
    await zipToCoordinates('90001');
    // Second call - should use cache
    await zipToCoordinates('90001');

    // fetch should only be called once due to caching
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('throws when API returns no results', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ results: [] }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ results: [] }),
      });

    // Use a unique ZIP so cache doesn't interfere
    await expect(zipToCoordinates('00000')).rejects.toThrow('Could not find location');
  });
});
