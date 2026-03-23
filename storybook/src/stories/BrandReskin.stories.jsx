import React from 'react';
import {
  Button,
  InlineNotification,
  Tag,
  Tile,
  Grid,
  Column,
} from '@carbon/react';
import { Add, ArrowRight, TrashCan } from '@carbon/react/icons';
import WeatherAlertBanner from './WeatherAlertBanner';

// ── Token reference table ─────────────────────────────────────────────

const TOKEN_OVERRIDES = [
  { token: '--cds-interactive',             ibm: '#0F62FE', brand: '#1B3D6F', usage: 'Interactive states, active rings' },
  { token: '--cds-button-primary',          ibm: '#0F62FE', brand: '#1B3D6F', usage: 'Primary button fill' },
  { token: '--cds-button-primary-hover',    ibm: '#0050E6', brand: '#142D52', usage: 'Primary button hover' },
  { token: '--cds-button-primary-active',   ibm: '#002D9C', brand: '#0D1F39', usage: 'Primary button active/pressed' },
  { token: '--cds-link-primary',            ibm: '#0F62FE', brand: '#1B3D6F', usage: 'Inline and standalone links' },
  { token: '--cds-focus',                   ibm: '#0F62FE', brand: '#1B3D6F', usage: 'Keyboard focus ring' },
  { token: '--cds-support-error',           ibm: '#DA1E28', brand: '#B91C1C', usage: 'Error notifications, danger tags' },
  { token: '--cds-support-warning',         ibm: '#F1C21B', brand: '#D97706', usage: 'Warning notifications, advisories' },
  { token: '--cds-support-success',         ibm: '#24A148', brand: '#0E7490', usage: 'Success notifications, clear-sky states' },
  { token: '--cds-tag-background-blue',     ibm: '#D0E2FF', brand: '#1B3D6F', usage: 'Blue tag background' },
  { token: '--cds-tag-background-teal',     ibm: '#9EF0F0', brand: '#0E7490', usage: 'Teal tag background' },
];

// ── Swatch helper ─────────────────────────────────────────────────────

function Swatch({ color, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div
        style={{
          width: '1.25rem',
          height: '1.25rem',
          borderRadius: '2px',
          background: color,
          border: '1px solid rgba(0,0,0,0.1)',
          flexShrink: 0,
        }}
      />
      <code style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>{label}</code>
    </div>
  );
}

// ── Component set used for before/after ───────────────────────────────

function SampleComponents() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Button kind="primary" renderIcon={ArrowRight}>Primary</Button>
        <Button kind="secondary">Secondary</Button>
        <Button kind="tertiary">Tertiary</Button>
        <Button kind="danger">Danger</Button>
        <Button kind="ghost" renderIcon={Add}>Ghost</Button>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Tag type="blue">Blue tag</Tag>
        <Tag type="teal">Teal tag</Tag>
        <Tag type="red">Red tag</Tag>
        <Tag type="cool-gray">Gray tag</Tag>
      </div>

      {/* Notifications */}
      <InlineNotification kind="info" title="Info:" subtitle="Here is some helpful information." hideCloseButton lowContrast />
      <InlineNotification kind="warning" title="Warning:" subtitle="Please review before continuing." hideCloseButton lowContrast />
      <InlineNotification kind="error" title="Error:" subtitle="Something needs your attention." hideCloseButton lowContrast />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Stories
// ─────────────────────────────────────────────────────────────────────

export default {
  title: 'Design System/Brand Reskin',
  parameters: {
    docs: {
      description: {
        component:
          'Demonstrates how the IBM Carbon design system can be reskinned for the Forecast4U brand by overriding a small set of CSS custom properties. All components are unchanged — only the token file differs.',
      },
    },
  },
};

/**
 * Side-by-side comparison of IBM Carbon defaults vs. the Forecast4U
 * brand theme. Same components, same code, different token set.
 *
 * Use the theme toolbar to toggle the global theme — the right column
 * always stays in the brand theme regardless, so you can compare.
 */
export const BeforeAndAfter = {
  render: () => (
    <div>
      <p style={{ marginBottom: '1.5rem', color: 'var(--cds-text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: '56rem' }}>
        The same Carbon components, rendered twice. Left column uses Carbon&apos;s default <code>white</code> theme.
        Right column applies the Forecast4U brand token overrides via <code>.cds--f4u</code>.
        No component code changes — only a CSS variable file is swapped.
      </p>
      <Grid>
        <Column lg={8} md={4} sm={4}>
          <Tile style={{ marginBottom: '0.5rem', padding: '0.5rem 1rem 0.25rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--cds-text-secondary)', marginBottom: '1rem' }}>
              Carbon Default (IBM Blue)
            </p>
            <div className="cds--white">
              <SampleComponents />
            </div>
          </Tile>
        </Column>
        <Column lg={8} md={4} sm={4}>
          <Tile style={{ marginBottom: '0.5rem', padding: '0.5rem 1rem 0.25rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--cds-text-secondary)', marginBottom: '1rem' }}>
              Forecast4U Brand (Navy + Amber)
            </p>
            <div className="cds--f4u">
              <SampleComponents />
            </div>
          </Tile>
        </Column>
      </Grid>
    </div>
  ),
};

/**
 * A reference table for the design team showing exactly which CSS tokens
 * were overridden, what Carbon ships by default, and what Forecast4U
 * replaces them with.
 */
export const TokenOverrides = {
  render: () => (
    <div style={{ maxWidth: '72rem' }}>
      <p style={{ marginBottom: '1.5rem', color: 'var(--cds-text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
        Forecast4U brand theme overrides <strong>{TOKEN_OVERRIDES.length} CSS custom properties</strong>.
        All other Carbon tokens (typography, spacing, layer, border) inherit from the base <code>white</code> theme.
        To apply a different brand, update <code>storybook/src/themes/forecast4u-brand.css</code>.
      </p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--cds-border-subtle)' }}>
              {['Token', 'IBM Default', 'Forecast4U Brand', 'Used for'].map((h) => (
                <th key={h} style={{ padding: '0.625rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--cds-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TOKEN_OVERRIDES.map((row, i) => (
              <tr key={row.token} style={{ borderBottom: '1px solid var(--cds-border-subtle)', background: i % 2 === 0 ? 'transparent' : 'var(--cds-layer)' }}>
                <td style={{ padding: '0.625rem 1rem' }}>
                  <code style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--cds-text-primary)' }}>{row.token}</code>
                </td>
                <td style={{ padding: '0.625rem 1rem' }}>
                  <Swatch color={row.ibm} label={row.ibm} />
                </td>
                <td style={{ padding: '0.625rem 1rem' }}>
                  <Swatch color={row.brand} label={row.brand} />
                </td>
                <td style={{ padding: '0.625rem 1rem', color: 'var(--cds-text-secondary)' }}>{row.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
};

/**
 * All Carbon Button variants rendered inside the Forecast4U brand theme.
 * Primary and tertiary buttons inherit brand color. Secondary and ghost
 * intentionally stay neutral — this is correct Carbon behavior.
 */
export const BrandedButtons = {
  render: () => (
    <div className="cds--f4u">
      <p style={{ marginBottom: '1.5rem', color: 'var(--cds-text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
        Primary and tertiary buttons pick up the brand token. Secondary and ghost are intentionally neutral — they draw from border and text tokens, not the interactive token. This is Carbon&apos;s correct hierarchy at work.
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <Button kind="primary" renderIcon={ArrowRight}>Primary</Button>
        <Button kind="secondary">Secondary</Button>
        <Button kind="tertiary">Tertiary</Button>
        <Button kind="danger" renderIcon={TrashCan}>Danger</Button>
        <Button kind="ghost" renderIcon={Add}>Ghost</Button>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <Button kind="primary" size="sm">Small</Button>
        <Button kind="primary" size="md">Medium</Button>
        <Button kind="primary" size="lg">Large</Button>
        <Button kind="primary" disabled>Disabled</Button>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Tag type="blue">Blue</Tag>
        <Tag type="teal">Teal</Tag>
        <Tag type="red">Red</Tag>
        <Tag type="green">Green</Tag>
        <Tag type="cool-gray">Gray</Tag>
        <Tag type="high-contrast">High contrast</Tag>
      </div>
    </div>
  ),
};

/**
 * WeatherAlertBanner in all severity levels inside the Forecast4U brand
 * theme. Border accent colors are driven by Carbon support tokens, so
 * they respond to the brand override without component changes.
 */
export const BrandedAlerts = {
  render: () => (
    <div className="cds--f4u" style={{ maxWidth: '720px' }}>
      <p style={{ marginBottom: '1.5rem', color: 'var(--cds-text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
        Alert borders use <code>var(--cds-support-error)</code>, <code>var(--cds-support-warning)</code>, and <code>var(--cds-support-success)</code>
        {' '}— all overridden in the brand theme. Toggle the toolbar to &quot;White&quot; to compare against Carbon defaults.
      </p>
      <WeatherAlertBanner
        severity="extreme"
        type="Tornado Warning"
        headline="Tornado warning in effect — take shelter immediately"
        description="The National Weather Service has issued a tornado warning. Move to an interior room on the lowest floor of a sturdy building."
        issuedAt="March 23, 2026 3:15 PM CDT"
        expiresAt="March 23, 2026 6:00 PM CDT"
        affectedAreas={['Cook County', 'DuPage County']}
      />
      <WeatherAlertBanner
        severity="moderate"
        type="Heat Advisory"
        headline="Heat index values up to 108°F expected through Saturday"
        description="Drink plenty of fluids, stay in air-conditioned spaces, and check on neighbors."
        issuedAt="March 23, 2026 10:00 AM CDT"
        expiresAt="March 24, 2026 8:00 PM CDT"
        affectedAreas={['Metro Area', 'Suburbs']}
      />
      <WeatherAlertBanner
        severity="minor"
        type="Frost Advisory"
        headline="Sub-freezing temperatures expected overnight"
        description="Cover sensitive plants and bring pets indoors."
        issuedAt="March 23, 2026 4:00 PM CDT"
        expiresAt="March 24, 2026 9:00 AM CDT"
        affectedAreas={['Northern Suburbs']}
      />
    </div>
  ),
};
