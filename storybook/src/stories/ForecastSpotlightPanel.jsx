import { Button, Column, Grid, Tag, Tile } from '@carbon/react';
import { ArrowRight, Location, RecentlyViewed, WarningAlt } from '@carbon/react/icons';

const defaultBadges = ['Reskin-ready', 'Carbon-native', 'Theme aware'];

const defaultMetrics = [
  {
    label: 'Feels like',
    value: '74F',
    caption: 'Warm but stable through the afternoon',
  },
  {
    label: 'Rain chance',
    value: '18%',
    caption: 'Light cloud cover with no major disruption',
  },
  {
    label: 'Wind',
    value: '9 mph',
    caption: 'Steady coastal breeze from the west',
  },
  {
    label: 'Air quality',
    value: 'Good',
    caption: 'Comfortable conditions for outdoor plans',
  },
];

const priorityConfig = {
  calm: {
    label: 'Clear Window',
    tagType: 'teal',
    accentColor: 'var(--cds-support-success, var(--cds-link-primary))',
    note: 'A calm state keeps the layout premium and conversion-focused while still feeling distinctly product-ready.',
  },
  watch: {
    label: 'Watch Mode',
    tagType: 'warm-gray',
    accentColor: 'var(--cds-support-warning, var(--cds-link-primary))',
    note: 'A watch state gives the design team a branded urgency pattern without leaving the Carbon component vocabulary.',
  },
  severe: {
    label: 'Rapid Response',
    tagType: 'red',
    accentColor: 'var(--cds-support-error, var(--cds-link-primary))',
    note: 'A severe state demonstrates how Carbon tiles, tags, and actions can support high-stakes communication in a polished brand shell.',
  },
};

/**
 * ForecastSpotlightPanel
 *
 * A design-team-facing Storybook component that combines Carbon primitives into
 * a production-style hero panel. The goal is to demonstrate a reskinnable
 * composition rather than a single base Carbon widget.
 *
 * @param {object} props - Component props.
 * @param {'calm' | 'watch' | 'severe'} [props.priority='watch'] - Visual urgency for the panel.
 * @param {string} [props.locationName='Beverly Hills, CA'] - Featured location name.
 * @param {string} [props.timestamp='Updated 10 minutes ago'] - Recency label for the content.
 * @param {string} [props.headline='Forecast spotlight for the next customer-facing release'] - Main heading.
 * @param {string} [props.summary] - Supporting copy shown below the heading.
 * @param {string[]} [props.badges] - Small design-system-oriented badges.
 * @param {Array<{label: string, value: string, caption: string}>} [props.metrics] - Summary metrics.
 * @param {string} [props.primaryActionLabel='Open component brief'] - Primary CTA text.
 * @param {string} [props.secondaryActionLabel='Compare dark mode'] - Secondary CTA text.
 * @returns {JSX.Element} A Carbon-based showcase component for Storybook.
 */
export default function ForecastSpotlightPanel({
  priority = 'watch',
  locationName = 'Beverly Hills, CA',
  timestamp = 'Updated 10 minutes ago',
  headline = 'Forecast spotlight for the next customer-facing release',
  summary = 'This composition gives the design team a polished reskin target: a branded hero panel with strong hierarchy, status framing, and reusable metric blocks built entirely from Carbon-friendly primitives.',
  badges = defaultBadges,
  metrics = defaultMetrics,
  primaryActionLabel = 'Open component brief',
  secondaryActionLabel = 'Compare dark mode',
}) {
  const config = priorityConfig[priority] || priorityConfig.watch;

  return (
    <Tile
      style={{
        padding: 0,
        overflow: 'hidden',
        borderLeft: `6px solid ${config.accentColor}`,
        borderColor: 'var(--cds-border-subtle)',
        background: 'linear-gradient(135deg, var(--cds-layer) 0%, var(--cds-layer-accent) 100%)',
      }}
    >
      <div
        style={{
          padding: '1.5rem',
          borderBottom: '1px solid var(--cds-border-subtle)',
        }}
      >
        <Grid condensed style={{ padding: 0 }}>
          <Column lg={8} md={4} sm={4}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
                marginBottom: '1rem',
              }}
            >
              <Tag type={config.tagType}>{config.label}</Tag>
              <Tag type="cool-gray">Design Team Preview</Tag>
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1rem',
                color: 'var(--cds-text-secondary)',
                fontSize: '0.875rem',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                <Location size={16} />
                {locationName}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                <RecentlyViewed size={16} />
                {timestamp}
              </span>
            </div>

            <h2
              style={{
                margin: 0,
                marginBottom: '0.75rem',
                fontSize: '1.75rem',
                lineHeight: 1.15,
                color: 'var(--cds-text-primary)',
              }}
            >
              {headline}
            </h2>

            <p
              style={{
                margin: 0,
                marginBottom: '1.25rem',
                maxWidth: '42rem',
                color: 'var(--cds-text-secondary)',
                lineHeight: 1.6,
              }}
            >
              {summary}
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '1.25rem',
              }}
            >
              {badges.map((badge) => (
                <Tag key={badge} type="cool-gray" size="sm">
                  {badge}
                </Tag>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <Button kind="primary" renderIcon={ArrowRight}>
                {primaryActionLabel}
              </Button>
              <Button kind="secondary">
                {secondaryActionLabel}
              </Button>
            </div>
          </Column>

          <Column lg={8} md={4} sm={4}>
            <Grid condensed style={{ padding: 0 }}>
              {metrics.map((metric) => (
                <Column key={metric.label} lg={8} md={4} sm={4}>
                  <div
                    style={{
                      height: '100%',
                      padding: '1rem',
                      background: 'var(--cds-background)',
                      border: '1px solid var(--cds-border-subtle)',
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        marginBottom: '0.375rem',
                        fontSize: '0.75rem',
                        color: 'var(--cds-text-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {metric.label}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        marginBottom: '0.5rem',
                        fontSize: '1.5rem',
                        lineHeight: 1.1,
                        color: 'var(--cds-text-primary)',
                      }}
                    >
                      {metric.value}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        color: 'var(--cds-text-secondary)',
                        lineHeight: 1.5,
                      }}
                    >
                      {metric.caption}
                    </p>
                  </div>
                </Column>
              ))}
            </Grid>
          </Column>
        </Grid>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'flex-start',
          padding: '1rem 1.5rem 1.25rem',
          color: 'var(--cds-text-secondary)',
        }}
      >
        <WarningAlt
          size={20}
          style={{
            flexShrink: 0,
            marginTop: '0.125rem',
            color: config.accentColor,
          }}
        />
        <div>
          <p
            style={{
              margin: 0,
              marginBottom: '0.25rem',
              color: 'var(--cds-text-primary)',
              fontWeight: 600,
            }}
          >
            Why this is useful in Storybook
          </p>
          <p
            style={{
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {config.note}
          </p>
        </div>
      </div>
    </Tile>
  );
}
