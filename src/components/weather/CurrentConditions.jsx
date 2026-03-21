import { Grid, Column, Tile } from '@carbon/react';
import { getWeatherInfo, getWeatherEmoji, getTempClass } from '../../utils/weatherCodes';
import { windDirectionLabel } from '../../utils/weatherApi';

/**
 * Displays current weather conditions in a hero card.
 */
export default function CurrentConditions({ current, locationName, locationState }) {
  const weather = getWeatherInfo(current.weatherCode);
  const emoji = getWeatherEmoji(weather.icon, !current.isDay);

  return (
    <Tile className="forecast-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <Grid>
        <Column lg={8} md={4} sm={4}>
          <p style={{ fontSize: '0.875rem', color: 'var(--cds-text-secondary)', marginBottom: '0.25rem' }}>
            Current Weather
          </p>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            {locationName}{locationState ? `, ${locationState}` : ''}
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--cds-text-secondary)', marginBottom: '1.5rem' }}>
            {weather.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1rem' }}>
            <span className={getTempClass(current.temperature)} style={{ fontSize: '4rem', fontWeight: 300, lineHeight: 1 }}>
              {current.temperature}°
            </span>
            <span style={{ fontSize: '1.5rem', color: 'var(--cds-text-secondary)' }}>F</span>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--cds-text-secondary)' }}>
            Feels like {current.feelsLike}°F
          </p>
        </Column>

        <Column lg={8} md={4} sm={4}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <span className="weather-icon-animated" style={{ fontSize: '5rem' }}>{emoji}</span>
          </div>

          <Grid condensed>
            <Column lg={8} md={4} sm={2}>
              <DetailItem label="Humidity" value={`${current.humidity}%`} />
            </Column>
            <Column lg={8} md={4} sm={2}>
              <DetailItem label="Wind" value={`${current.windSpeed} mph ${windDirectionLabel(current.windDirection)}`} />
            </Column>
            <Column lg={8} md={4} sm={2}>
              <DetailItem label="Cloud Cover" value={`${current.cloudCover}%`} />
            </Column>
            <Column lg={8} md={4} sm={2}>
              <DetailItem label="Pressure" value={`${Math.round(current.pressure)} hPa`} />
            </Column>
          </Grid>
        </Column>
      </Grid>
    </Tile>
  );
}

function DetailItem({ label, value }) {
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <p style={{ fontSize: '0.75rem', color: 'var(--cds-text-secondary)', marginBottom: '0.125rem' }}>
        {label}
      </p>
      <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>{value}</p>
    </div>
  );
}
