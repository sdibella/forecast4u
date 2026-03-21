/**
 * WMO Weather Code mapping
 * Maps WMO 4677 codes to human-readable descriptions and icon identifiers.
 */
const weatherCodes = {
  0: { description: 'Clear sky', icon: 'sunny', severity: 'clear' },
  1: { description: 'Mainly clear', icon: 'mostly-sunny', severity: 'clear' },
  2: { description: 'Partly cloudy', icon: 'partly-cloudy', severity: 'clear' },
  3: { description: 'Overcast', icon: 'cloudy', severity: 'cloudy' },
  45: { description: 'Fog', icon: 'fog', severity: 'cloudy' },
  48: { description: 'Depositing rime fog', icon: 'fog', severity: 'cloudy' },
  51: { description: 'Light drizzle', icon: 'drizzle', severity: 'rain' },
  53: { description: 'Moderate drizzle', icon: 'drizzle', severity: 'rain' },
  55: { description: 'Dense drizzle', icon: 'drizzle', severity: 'rain' },
  56: { description: 'Light freezing drizzle', icon: 'sleet', severity: 'rain' },
  57: { description: 'Dense freezing drizzle', icon: 'sleet', severity: 'rain' },
  61: { description: 'Slight rain', icon: 'rain-light', severity: 'rain' },
  63: { description: 'Moderate rain', icon: 'rain', severity: 'rain' },
  65: { description: 'Heavy rain', icon: 'rain-heavy', severity: 'rain' },
  66: { description: 'Light freezing rain', icon: 'sleet', severity: 'rain' },
  67: { description: 'Heavy freezing rain', icon: 'sleet', severity: 'rain' },
  71: { description: 'Slight snow', icon: 'snow-light', severity: 'snow' },
  73: { description: 'Moderate snow', icon: 'snow', severity: 'snow' },
  75: { description: 'Heavy snow', icon: 'snow-heavy', severity: 'snow' },
  77: { description: 'Snow grains', icon: 'snow-light', severity: 'snow' },
  80: { description: 'Slight rain showers', icon: 'rain-light', severity: 'rain' },
  81: { description: 'Moderate rain showers', icon: 'rain', severity: 'rain' },
  82: { description: 'Violent rain showers', icon: 'rain-heavy', severity: 'rain' },
  85: { description: 'Slight snow showers', icon: 'snow-light', severity: 'snow' },
  86: { description: 'Heavy snow showers', icon: 'snow-heavy', severity: 'snow' },
  95: { description: 'Thunderstorm', icon: 'thunderstorm', severity: 'storm' },
  96: { description: 'Thunderstorm with slight hail', icon: 'thunderstorm', severity: 'storm' },
  99: { description: 'Thunderstorm with heavy hail', icon: 'thunderstorm', severity: 'storm' },
};

/**
 * Get weather info from a WMO code
 * @param {number} code - WMO weather code
 * @returns {{ description: string, icon: string, severity: string }}
 */
export function getWeatherInfo(code) {
  return weatherCodes[code] || { description: 'Unknown', icon: 'unknown', severity: 'clear' };
}

/**
 * Get a weather emoji for display
 * @param {string} icon - Icon identifier from weatherCodes
 * @param {boolean} isNight - Whether it's nighttime
 * @returns {string} Emoji representation
 */
export function getWeatherEmoji(icon, isNight = false) {
  const emojiMap = {
    sunny: isNight ? '\u{1F319}' : '\u{2600}\u{FE0F}',
    'mostly-sunny': isNight ? '\u{1F319}' : '\u{1F324}\u{FE0F}',
    'partly-cloudy': isNight ? '\u{2601}\u{FE0F}' : '\u{26C5}',
    cloudy: '\u{2601}\u{FE0F}',
    fog: '\u{1F32B}\u{FE0F}',
    drizzle: '\u{1F326}\u{FE0F}',
    'rain-light': '\u{1F326}\u{FE0F}',
    rain: '\u{1F327}\u{FE0F}',
    'rain-heavy': '\u{1F327}\u{FE0F}',
    sleet: '\u{1F328}\u{FE0F}',
    'snow-light': '\u{1F328}\u{FE0F}',
    snow: '\u{2744}\u{FE0F}',
    'snow-heavy': '\u{2744}\u{FE0F}',
    thunderstorm: '\u{26A1}',
    unknown: '\u{2753}',
  };
  return emojiMap[icon] || '\u{2753}';
}

/**
 * Get a CSS class for temperature-based coloring
 * @param {number} tempF - Temperature in Fahrenheit
 * @returns {string} CSS class name
 */
export function getTempClass(tempF) {
  if (tempF <= 32) return 'temp-cold';
  if (tempF <= 50) return 'temp-cool';
  if (tempF <= 70) return 'temp-mild';
  if (tempF <= 85) return 'temp-warm';
  return 'temp-hot';
}

/**
 * Convert Celsius to Fahrenheit
 */
export function cToF(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

/**
 * Convert Fahrenheit to Celsius
 */
export function fToC(fahrenheit) {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}

export default weatherCodes;
