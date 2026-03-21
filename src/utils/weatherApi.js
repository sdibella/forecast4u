/**
 * Open-Meteo Weather API integration
 * Fetches 5-day forecast data in hourly increments.
 */

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * Fetch weather forecast for given coordinates.
 * Returns hourly data for the next 5 days, which we group into 3-hour intervals.
 *
 * @param {number} latitude
 * @param {number} longitude
 * @param {string} timezone - IANA timezone string
 * @returns {Promise<Object>} Processed forecast data
 */
export async function fetchForecast(latitude, longitude, timezone = 'auto') {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'precipitation_probability',
      'precipitation',
      'weather_code',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m',
      'uv_index',
      'visibility',
      'surface_pressure',
      'cloud_cover',
      'is_day',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'apparent_temperature_max',
      'apparent_temperature_min',
      'sunrise',
      'sunset',
      'uv_index_max',
      'precipitation_sum',
      'precipitation_probability_max',
      'wind_speed_10m_max',
      'wind_gusts_10m_max',
    ].join(','),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'weather_code',
      'wind_speed_10m',
      'wind_direction_10m',
      'is_day',
      'precipitation',
      'cloud_cover',
      'surface_pressure',
    ].join(','),
    temperature_unit: 'fahrenheit',
    wind_speed_unit: 'mph',
    precipitation_unit: 'inch',
    timezone,
    forecast_days: '5',
  });

  const response = await fetch(`${BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return processWeatherData(data);
}

/**
 * Process raw Open-Meteo API response into a structured format.
 * Groups hourly data into 3-hour intervals and organizes by day.
 */
function processWeatherData(raw) {
  const { current, hourly, daily, timezone } = raw;

  // Process current conditions
  const currentWeather = {
    temperature: Math.round(current.temperature_2m),
    feelsLike: Math.round(current.apparent_temperature),
    humidity: current.relative_humidity_2m,
    weatherCode: current.weather_code,
    windSpeed: Math.round(current.wind_speed_10m),
    windDirection: current.wind_direction_10m,
    isDay: current.is_day === 1,
    precipitation: current.precipitation,
    cloudCover: current.cloud_cover,
    pressure: current.surface_pressure,
  };

  // Process hourly data into 3-hour intervals
  const hourlyIntervals = [];
  for (let i = 0; i < hourly.time.length; i += 3) {
    hourlyIntervals.push({
      time: hourly.time[i],
      temperature: Math.round(hourly.temperature_2m[i]),
      feelsLike: Math.round(hourly.apparent_temperature[i]),
      humidity: hourly.relative_humidity_2m[i],
      precipProbability: hourly.precipitation_probability[i],
      precipitation: hourly.precipitation[i],
      weatherCode: hourly.weather_code[i],
      windSpeed: Math.round(hourly.wind_speed_10m[i]),
      windDirection: hourly.wind_direction_10m[i],
      windGusts: Math.round(hourly.wind_gusts_10m[i]),
      uvIndex: hourly.uv_index[i],
      visibility: hourly.visibility[i],
      pressure: hourly.surface_pressure[i],
      cloudCover: hourly.cloud_cover[i],
      isDay: hourly.is_day[i] === 1,
    });
  }

  // Process daily summaries
  const dailySummaries = daily.time.map((date, i) => ({
    date,
    weatherCode: daily.weather_code[i],
    tempMax: Math.round(daily.temperature_2m_max[i]),
    tempMin: Math.round(daily.temperature_2m_min[i]),
    feelsLikeMax: Math.round(daily.apparent_temperature_max[i]),
    feelsLikeMin: Math.round(daily.apparent_temperature_min[i]),
    sunrise: daily.sunrise[i],
    sunset: daily.sunset[i],
    uvIndexMax: daily.uv_index_max[i],
    precipSum: daily.precipitation_sum[i],
    precipProbMax: daily.precipitation_probability_max[i],
    windSpeedMax: Math.round(daily.wind_speed_10m_max[i]),
    windGustsMax: Math.round(daily.wind_gusts_10m_max[i]),
  }));

  // Group 3-hour intervals by day
  const forecastByDay = dailySummaries.map((daySummary) => {
    const dayStr = daySummary.date;
    const intervals = hourlyIntervals.filter((h) => h.time.startsWith(dayStr));
    return {
      ...daySummary,
      intervals,
    };
  });

  return {
    current: currentWeather,
    forecastByDay,
    hourlyIntervals,
    timezone,
  };
}

/**
 * Get wind direction as a compass label.
 * @param {number} degrees
 * @returns {string}
 */
export function windDirectionLabel(degrees) {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

/**
 * Format a time string for display.
 * @param {string} isoString - ISO datetime string from API
 * @returns {string} Formatted time (e.g., "3 PM")
 */
export function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
}

/**
 * Format a date string for display.
 * @param {string} dateString - YYYY-MM-DD format
 * @returns {string} Formatted date (e.g., "Mon, Mar 21")
 */
export function formatDate(dateString) {
  const date = new Date(dateString + 'T12:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}
