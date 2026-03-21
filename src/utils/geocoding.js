/**
 * Geocoding utilities for converting ZIP codes to coordinates.
 * Uses the Open-Meteo Geocoding API as primary, with fallback.
 */

const GEOCODING_CACHE = new Map();

/**
 * Convert a US ZIP code to latitude/longitude coordinates.
 * Uses Open-Meteo's geocoding API (no key required).
 * @param {string} zip - US ZIP code (5 digits)
 * @returns {Promise<{ latitude: number, longitude: number, name: string, state: string }>}
 */
export async function zipToCoordinates(zip) {
  if (!/^\d{5}$/.test(zip)) {
    throw new Error(`Invalid ZIP code: "${zip}". Please enter a 5-digit US ZIP code.`);
  }

  // Check cache first
  if (GEOCODING_CACHE.has(zip)) {
    return GEOCODING_CACHE.get(zip);
  }

  try {
    // Use Open-Meteo geocoding API - search by ZIP + country code
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${zip}&count=5&language=en&format=json&country_code=US`
    );

    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      // Fallback: try searching with "ZIP" prefix for postal code matching
      const fallbackResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${zip}%20USA&count=3&language=en&format=json`
      );
      const fallbackData = await fallbackResponse.json();

      if (!fallbackData.results || fallbackData.results.length === 0) {
        throw new Error(`Could not find location for ZIP code: ${zip}`);
      }

      const result = {
        latitude: fallbackData.results[0].latitude,
        longitude: fallbackData.results[0].longitude,
        name: fallbackData.results[0].name,
        state: fallbackData.results[0].admin1 || '',
        country: fallbackData.results[0].country || 'US',
        timezone: fallbackData.results[0].timezone || 'America/New_York',
      };

      GEOCODING_CACHE.set(zip, result);
      return result;
    }

    // Pick the first US result, preferring postal code type matches
    const usResult = data.results.find((r) => r.country_code === 'US') || data.results[0];

    const result = {
      latitude: usResult.latitude,
      longitude: usResult.longitude,
      name: usResult.name,
      state: usResult.admin1 || '',
      country: usResult.country || 'US',
      timezone: usResult.timezone || 'America/New_York',
    };

    GEOCODING_CACHE.set(zip, result);
    return result;
  } catch (error) {
    if (error.message.includes('Could not find')) {
      throw error;
    }
    throw new Error(`Failed to geocode ZIP code ${zip}: ${error.message}`);
  }
}

/**
 * Reverse geocode coordinates to a location name.
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<{ name: string, state: string, zip: string }>}
 */
export async function coordinatesToLocation(latitude, longitude) {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&count=1&language=en&format=json`
    );

    if (!response.ok) {
      return { name: 'Your Location', state: '', zip: '' };
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return {
        name: data.results[0].name,
        state: data.results[0].admin1 || '',
        zip: data.results[0].postcodes?.[0] || '',
      };
    }

    return { name: 'Your Location', state: '', zip: '' };
  } catch {
    return { name: 'Your Location', state: '', zip: '' };
  }
}
