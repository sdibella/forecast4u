import { useState, useCallback } from 'react';
import { coordinatesToLocation } from '../utils/geocoding';

/**
 * Custom hook for browser geolocation.
 * Returns the user's detected location and a function to trigger detection.
 */
export function useGeolocation() {
  const [detecting, setDetecting] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const detect = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setDetecting(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const result = await coordinatesToLocation(
            position.coords.latitude,
            position.coords.longitude
          );
          setLocation({
            ...result,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        } catch {
          setLocation({
            name: 'Your Location',
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        } finally {
          setDetecting(false);
        }
      },
      (err) => {
        setError(`Location access denied: ${err.message}`);
        setDetecting(false);
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }, []);

  return { location, detecting, error, detect };
}
