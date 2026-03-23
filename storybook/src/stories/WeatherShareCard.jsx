import React from 'react';
import { Button, Tag } from '@carbon/react';
import { Share, Location, PartlyCloudy, Rain, Hail, Snowflake, Windy } from '@carbon/react/icons';

const conditionIcons = {
  sunny: PartlyCloudy,
  cloudy: PartlyCloudy,
  rainy: Rain,
  stormy: Hail,
  snowy: Snowflake,
  windy: Windy,
};

const conditionLabels = {
  sunny: 'Sunny',
  cloudy: 'Partly Cloudy',
  rainy: 'Rainy',
  stormy: 'Stormy',
  snowy: 'Snowy',
  windy: 'Windy',
};

function SectionDivider() {
  return (
    <hr
      aria-hidden="true"
      style={{
        margin: 0,
        border: 0,
        borderTop: '1px solid var(--cds-border-subtle)',
      }}
    />
  );
}

export default function WeatherShareCard({
  city = 'New York',
  state = 'NY',
  zip = '10001',
  condition = 'sunny',
  tempHigh = 74,
  tempLow = 58,
  precipitation = 10,
  humidity = 45,
  wind = 12,
  date = 'Saturday, March 22',
  onShare,
}) {
  const ConditionIcon = conditionIcons[condition] ?? PartlyCloudy;

  return (
    <div
      style={{
        width: '360px',
        background: 'var(--cds-layer)',
        border: '1px solid var(--cds-border-subtle)',
        borderTop: '4px solid var(--cds-interactive)',
        borderRadius: '2px',
        overflow: 'hidden',
        fontFamily: 'var(--cds-body-short-01-font-family, IBM Plex Sans, sans-serif)',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '1.25rem 1.25rem 1rem',
          background: 'var(--cds-layer-accent)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                marginBottom: '0.25rem',
                color: 'var(--cds-text-secondary)',
                fontSize: '0.75rem',
              }}
            >
              <Location size={12} />
              <span>{city}, {state} · {zip}</span>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: '0.8125rem',
                color: 'var(--cds-text-secondary)',
              }}
            >
              {date}
            </p>
          </div>
          <Tag type="blue" size="sm">forecast4u</Tag>
        </div>
      </div>

      {/* Condition + Temp */}
      <div
        style={{
          padding: '1.5rem 1.25rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
        }}
      >
        <ConditionIcon
          size={56}
          style={{ color: 'var(--cds-interactive)', flexShrink: 0 }}
        />
        <div>
          <div
            style={{
              fontSize: '3rem',
              fontWeight: 300,
              lineHeight: 1,
              color: 'var(--cds-text-primary)',
              marginBottom: '0.25rem',
            }}
          >
            {tempHigh}°
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--cds-text-secondary)' }}>
            {conditionLabels[condition] ?? condition}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--cds-text-secondary)', marginTop: '0.125rem' }}>
            L: {tempLow}°
          </div>
        </div>
      </div>

      <SectionDivider />

      {/* Stats row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          padding: '0.875rem 1.25rem',
          gap: '0.5rem',
        }}
      >
        {[
          { label: 'Precip', value: `${precipitation}%` },
          { label: 'Humidity', value: `${humidity}%` },
          { label: 'Wind', value: `${wind} mph` },
        ].map(({ label, value }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: '1rem',
                fontWeight: 500,
                color: 'var(--cds-text-primary)',
              }}
            >
              {value}
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--cds-text-secondary)', marginTop: '0.125rem' }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      <SectionDivider />

      {/* Footer */}
      <div
        style={{
          padding: '0.75rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: '0.6875rem', color: 'var(--cds-text-disabled)' }}>
          forecast4u.app
        </span>
        <Button
          kind="ghost"
          size="sm"
          renderIcon={Share}
          iconDescription="Share forecast"
          onClick={onShare}
        >
          Share
        </Button>
      </div>
    </div>
  );
}
