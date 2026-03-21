import { useState, useEffect, useCallback } from 'react';
import { fetchForecast } from '../utils/weatherApi';
import { zipToCoordinates } from '../utils/geocoding';

/**
 * Custom hook for fetching and managing weather data.
 * @param {string} zip - ZIP code to fetch weather for
 * @returns {{ data, location, loading, error, refetch }}
 */
export function useWeather(zip) {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!zip) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Geocode the ZIP
      const coords = await zipToCoordinates(zip);
      setLocation(coords);

      // Step 2: Fetch weather for those coords
      const forecast = await fetchForecast(
        coords.latitude,
        coords.longitude,
        coords.timezone
      );
      setData(forecast);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [zip]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, location, loading, error, refetch: fetchData };
}
