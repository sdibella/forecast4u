import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchForecast, windDirectionLabel, formatTime, formatDate } from './weatherApi';

describe('fetchForecast', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches weather data and returns the processed forecast structure', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          current: {
            temperature_2m: 72,
            apparent_temperature: 70,
            relative_humidity_2m: 45,
            weather_code: 2,
            wind_speed_10m: 10,
            wind_direction_10m: 180,
            is_day: 1,
            precipitation: 0,
            cloud_cover: 20,
            surface_pressure: 1012,
          },
          hourly: {
            time: [
              '2026-03-21T00:00',
              '2026-03-21T01:00',
              '2026-03-21T02:00',
              '2026-03-21T03:00',
              '2026-03-22T00:00',
              '2026-03-22T01:00',
              '2026-03-22T02:00',
              '2026-03-22T03:00',
            ],
            temperature_2m: [70, 71, 72, 73, 60, 61, 62, 63],
            relative_humidity_2m: [50, 48, 47, 46, 55, 56, 57, 58],
            apparent_temperature: [69, 70, 71, 72, 59, 60, 61, 62],
            precipitation_probability: [0, 5, 10, 20, 30, 40, 50, 60],
            precipitation: [0, 0, 0.01, 0.02, 0.1, 0.12, 0.15, 0.2],
            weather_code: [1, 1, 2, 3, 61, 61, 63, 65],
            wind_speed_10m: [5, 6, 7, 8, 9, 10, 11, 12],
            wind_direction_10m: [0, 45, 90, 135, 180, 225, 270, 315],
            wind_gusts_10m: [10, 11, 12, 13, 14, 15, 16, 17],
            uv_index: [0, 0, 1, 2, 2, 3, 4, 5],
            visibility: [10000, 10000, 10000, 10000, 9000, 9000, 9000, 9000],
            surface_pressure: [1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017],
            cloud_cover: [10, 20, 30, 40, 50, 60, 70, 80],
            is_day: [0, 0, 1, 1, 1, 1, 1, 1],
          },
          daily: {
            time: ['2026-03-21', '2026-03-22'],
            weather_code: [3, 63],
            temperature_2m_max: [75, 65],
            temperature_2m_min: [55, 50],
            apparent_temperature_max: [74, 64],
            apparent_temperature_min: [54, 49],
            sunrise: ['2026-03-21T06:00', '2026-03-22T06:01'],
            sunset: ['2026-03-21T18:00', '2026-03-22T18:01'],
            uv_index_max: [6, 5],
            precipitation_sum: [0.5, 1.2],
            precipitation_probability_max: [20, 70],
            wind_speed_10m_max: [12, 15],
            wind_gusts_10m_max: [20, 24],
          },
          timezone: 'America/New_York',
        }),
    });

    const result = await fetchForecast(40.7128, -74.006, 'America/New_York');

    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('latitude=40.7128'));
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('longitude=-74.006'));
    expect(result.current).toEqual(
      expect.objectContaining({
        temperature: 72,
        feelsLike: 70,
        humidity: 45,
        weatherCode: 2,
      })
    );
    expect(result.forecastByDay).toHaveLength(2);
    expect(result.forecastByDay[0].intervals).toHaveLength(2);
    expect(result.forecastByDay[1].intervals[0]).toEqual(
      expect.objectContaining({
        time: '2026-03-22T02:00',
        temperature: 62,
        precipProbability: 50,
      })
    );
    expect(result.timezone).toBe('America/New_York');
  });

  it('throws a helpful error when the weather API responds with a failure', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
      statusText: 'Service Unavailable',
    });

    await expect(fetchForecast(40.7128, -74.006)).rejects.toThrow(
      'Weather API error: 503 Service Unavailable'
    );
  });
});

describe('windDirectionLabel', () => {
  it('returns N for 0 degrees', () => {
    expect(windDirectionLabel(0)).toBe('N');
  });

  it('returns E for 90 degrees', () => {
    expect(windDirectionLabel(90)).toBe('E');
  });

  it('returns S for 180 degrees', () => {
    expect(windDirectionLabel(180)).toBe('S');
  });

  it('returns W for 270 degrees', () => {
    expect(windDirectionLabel(270)).toBe('W');
  });

  it('returns NE for 45 degrees', () => {
    expect(windDirectionLabel(45)).toBe('NE');
  });

  it('returns N for 360 degrees (full circle)', () => {
    expect(windDirectionLabel(360)).toBe('N');
  });
});

describe('formatTime', () => {
  it('formats morning time correctly', () => {
    const result = formatTime('2026-03-21T09:00');
    expect(result).toMatch(/9\s*AM/i);
  });

  it('formats afternoon time correctly', () => {
    const result = formatTime('2026-03-21T15:00');
    expect(result).toMatch(/3\s*PM/i);
  });

  it('formats midnight correctly', () => {
    const result = formatTime('2026-03-21T00:00');
    expect(result).toMatch(/12\s*AM/i);
  });

  it('formats noon correctly', () => {
    const result = formatTime('2026-03-21T12:00');
    expect(result).toMatch(/12\s*PM/i);
  });
});

describe('formatDate', () => {
  it('formats a date string correctly', () => {
    const result = formatDate('2026-03-21');
    expect(result).toContain('Mar');
    expect(result).toContain('21');
  });

  it('includes day of week', () => {
    // March 21, 2026 is a Saturday
    const result = formatDate('2026-03-21');
    expect(result).toContain('Sat');
  });
});
