import { Tile } from '@carbon/react';
import { getWeatherInfo, getWeatherEmoji, getTempClass } from '../../utils/weatherCodes';
import { formatDate } from '../../utils/weatherApi';

/**
 * Individual day forecast card showing summary conditions.
 */
export default function DailyForecastCard({ day, isSelected, onClick }) {
  const weather = getWeatherInfo(day.weatherCode);
  const emoji = getWeatherEmoji(weather.icon);
  const isToday = day.date === new Date().toISOString().split('T')[0];

  return (
    <Tile
      className="forecast-card"
      onClick={onClick}
      style={{
        padding: '1.25rem 1rem',
        cursor: 'pointer',
        textAlign: 'center',
        border: isSelected ? '2px solid var(--cds-interactive)' : '2px solid transparent',
        borderRadius: 'var(--f4u-card-radius)',
        transition: 'all 0.2s ease',
      }}
    >
      <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>
        {isToday ? 'Today' : formatDate(day.date)}
      </p>

      <div className="weather-icon-animated" style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>
        {emoji}
      </div>

      <p style={{ fontSize: '0.75rem', color: 'var(--cds-text-secondary)', marginBottom: '0.75rem' }}>
        {weather.description}
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <span className={getTempClass(day.tempMax)} style={{ fontWeight: 600 }}>
          {day.tempMax}°
        </span>
        <span style={{ color: 'var(--cds-text-secondary)' }}>
          {day.tempMin}°
        </span>
      </div>

      <div style={{ fontSize: '0.75rem', color: 'var(--cds-text-secondary)' }}>
        {day.precipProbMax > 0 && (
          <span>{day.precipProbMax}% precip</span>
        )}
        {day.precipProbMax === 0 && (
          <span>No precip</span>
        )}
      </div>

      <div style={{ fontSize: '0.75rem', color: 'var(--cds-text-secondary)', marginTop: '0.25rem' }}>
        Wind {day.windSpeedMax} mph
      </div>
    </Tile>
  );
}
