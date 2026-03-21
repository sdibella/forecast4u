import { useState, useCallback } from 'react';

const STORAGE_KEY = 'forecast4u-saved-locations';
const MAX_SAVED = 8;

/**
 * Custom hook for managing saved/recent locations.
 */
export function useSavedLocations() {
  const [locations, setLocations] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const persist = (updated) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  const addLocation = useCallback((zip, name, state) => {
    setLocations((prev) => {
      // Remove if already exists
      const filtered = prev.filter((loc) => loc.zip !== zip);
      const updated = [{ zip, name, state, lastVisited: Date.now() }, ...filtered].slice(0, MAX_SAVED);
      persist(updated);
      return updated;
    });
  }, []);

  const removeLocation = useCallback((zip) => {
    setLocations((prev) => {
      const updated = prev.filter((loc) => loc.zip !== zip);
      persist(updated);
      return updated;
    });
  }, []);

  const clearLocations = useCallback(() => {
    setLocations([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  return { locations, addLocation, removeLocation, clearLocations };
}
