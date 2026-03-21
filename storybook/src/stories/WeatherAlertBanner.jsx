import { useState } from 'react';
import {
  Tile,
  Button,
  Tag,
  Grid,
  Column,
} from '@carbon/react';
import { WarningAlt, Close, ChevronDown, ChevronUp } from '@carbon/react/icons';

/**
 * WeatherAlertBanner - A custom Carbon-based component for the design team.
 *
 * Displays weather alerts (severe weather warnings, advisories, watches) in
 * a prominent, dismissible banner with expandable details. Built using Carbon
 * primitives and designed to be reskinnable for production use.
 *
 * Props:
 * @param {string} severity - 'extreme' | 'severe' | 'moderate' | 'minor'
 * @param {string} type - Alert type (e.g., 'Thunderstorm Warning', 'Heat Advisory')
 * @param {string} headline - Short headline text
 * @param {string} description - Detailed alert description
 * @param {string} issuedAt - When the alert was issued
 * @param {string} expiresAt - When the alert expires
 * @param {string[]} affectedAreas - List of affected areas
 * @param {boolean} dismissible - Whether the banner can be dismissed
 * @param {function} onDismiss - Called when dismissed
 */
export default function WeatherAlertBanner({
  severity = 'moderate',
  type = 'Weather Advisory',
  headline = 'Weather alert in your area',
  description = 'Check local conditions and take appropriate precautions.',
  issuedAt = '',
  expiresAt = '',
  affectedAreas = [],
  dismissible = true,
  onDismiss,
}) {
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const severityConfig = {
    extreme: {
      tagType: 'red',
      borderColor: '#da1e28',
      bgColor: '#fff1f1',
      darkBgColor: '#520408',
      label: 'Extreme',
    },
    severe: {
      tagType: 'magenta',
      borderColor: '#d02670',
      bgColor: '#fff0f7',
      darkBgColor: '#510224',
      label: 'Severe',
    },
    moderate: {
      tagType: 'orange',
      borderColor: '#eb6200',
      bgColor: '#fff2e8',
      darkBgColor: '#3e1a00',
      label: 'Moderate',
    },
    minor: {
      tagType: 'teal',
      borderColor: '#009d9a',
      bgColor: '#d9fbfb',
      darkBgColor: '#004144',
      label: 'Minor',
    },
  };

  const config = severityConfig[severity] || severityConfig.moderate;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <Tile
      style={{
        borderLeft: `4px solid ${config.borderColor}`,
        padding: '1rem 1.25rem',
        marginBottom: '1rem',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
          <WarningAlt size={24} style={{ color: config.borderColor, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
              <Tag type={config.tagType} size="sm">
                {config.label}
              </Tag>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{type}</span>
            </div>
            <p style={{ fontSize: '0.875rem', margin: 0, color: 'var(--cds-text-primary)' }}>
              {headline}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.25rem', flexShrink: 0 }}>
          <Button
            kind="ghost"
            size="sm"
            hasIconOnly
            renderIcon={expanded ? ChevronUp : ChevronDown}
            iconDescription={expanded ? 'Collapse' : 'Expand'}
            onClick={() => setExpanded(!expanded)}
          />
          {dismissible && (
            <Button
              kind="ghost"
              size="sm"
              hasIconOnly
              renderIcon={Close}
              iconDescription="Dismiss"
              onClick={handleDismiss}
            />
          )}
        </div>
      </div>

      {/* Expandable details */}
      {expanded && (
        <div
          style={{
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--cds-border-subtle)',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <p style={{ fontSize: '0.875rem', marginBottom: '1rem', lineHeight: 1.5 }}>
            {description}
          </p>

          <Grid condensed>
            {issuedAt && (
              <Column lg={4} md={4} sm={4}>
                <div style={{ marginBottom: '0.75rem' }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--cds-text-secondary)', marginBottom: '0.125rem' }}>
                    Issued
                  </p>
                  <p style={{ fontSize: '0.875rem' }}>{issuedAt}</p>
                </div>
              </Column>
            )}
            {expiresAt && (
              <Column lg={4} md={4} sm={4}>
                <div style={{ marginBottom: '0.75rem' }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--cds-text-secondary)', marginBottom: '0.125rem' }}>
                    Expires
                  </p>
                  <p style={{ fontSize: '0.875rem' }}>{expiresAt}</p>
                </div>
              </Column>
            )}
          </Grid>

          {affectedAreas.length > 0 && (
            <div style={{ marginTop: '0.5rem' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--cds-text-secondary)', marginBottom: '0.5rem' }}>
                Affected Areas
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                {affectedAreas.map((area, i) => (
                  <Tag key={i} type="cool-gray" size="sm">
                    {area}
                  </Tag>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Tile>
  );
}
