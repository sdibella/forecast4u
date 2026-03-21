import { describe, it, expect } from 'vitest';
import { windDirectionLabel, formatTime, formatDate } from './weatherApi';

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
