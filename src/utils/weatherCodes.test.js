import { describe, it, expect } from 'vitest';
import { getWeatherInfo, getWeatherEmoji, getTempClass, cToF, fToC } from './weatherCodes';

describe('getWeatherInfo', () => {
  it('returns correct info for clear sky (code 0)', () => {
    const info = getWeatherInfo(0);
    expect(info.description).toBe('Clear sky');
    expect(info.icon).toBe('sunny');
    expect(info.severity).toBe('clear');
  });

  it('returns correct info for thunderstorm (code 95)', () => {
    const info = getWeatherInfo(95);
    expect(info.description).toBe('Thunderstorm');
    expect(info.icon).toBe('thunderstorm');
    expect(info.severity).toBe('storm');
  });

  it('returns correct info for moderate rain (code 63)', () => {
    const info = getWeatherInfo(63);
    expect(info.description).toBe('Moderate rain');
    expect(info.icon).toBe('rain');
    expect(info.severity).toBe('rain');
  });

  it('returns unknown for unrecognized code', () => {
    const info = getWeatherInfo(999);
    expect(info.description).toBe('Unknown');
    expect(info.icon).toBe('unknown');
  });
});

describe('getWeatherEmoji', () => {
  it('returns sun emoji for sunny during day', () => {
    const emoji = getWeatherEmoji('sunny', false);
    expect(emoji).toBe('\u{2600}\u{FE0F}');
  });

  it('returns moon emoji for sunny at night', () => {
    const emoji = getWeatherEmoji('sunny', true);
    expect(emoji).toBe('\u{1F319}');
  });

  it('returns thunderstorm emoji', () => {
    const emoji = getWeatherEmoji('thunderstorm');
    expect(emoji).toBe('\u{26A1}');
  });

  it('returns question mark for unknown icon', () => {
    const emoji = getWeatherEmoji('nonexistent');
    expect(emoji).toBe('\u{2753}');
  });
});

describe('getTempClass', () => {
  it('returns temp-cold for freezing temps', () => {
    expect(getTempClass(20)).toBe('temp-cold');
    expect(getTempClass(32)).toBe('temp-cold');
  });

  it('returns temp-cool for cool temps', () => {
    expect(getTempClass(40)).toBe('temp-cool');
  });

  it('returns temp-mild for moderate temps', () => {
    expect(getTempClass(65)).toBe('temp-mild');
  });

  it('returns temp-warm for warm temps', () => {
    expect(getTempClass(80)).toBe('temp-warm');
  });

  it('returns temp-hot for hot temps', () => {
    expect(getTempClass(100)).toBe('temp-hot');
  });
});

describe('temperature conversions', () => {
  it('converts Celsius to Fahrenheit correctly', () => {
    expect(cToF(0)).toBe(32);
    expect(cToF(100)).toBe(212);
    expect(cToF(-40)).toBe(-40);
  });

  it('converts Fahrenheit to Celsius correctly', () => {
    expect(fToC(32)).toBe(0);
    expect(fToC(212)).toBe(100);
    expect(fToC(-40)).toBe(-40);
  });
});
