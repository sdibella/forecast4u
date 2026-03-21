import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@carbon/react', async () => import('../../../node_modules/@carbon/react/lib/index.js'));
vi.mock('@carbon/react/icons', async () => import('../../../node_modules/@carbon/react/icons/index.js'));

import ForecastSpotlightPanel from './ForecastSpotlightPanel';

describe('ForecastSpotlightPanel', () => {
  it('renders the default design showcase content', () => {
    render(<ForecastSpotlightPanel />);

    expect(screen.getByText('Design Team Preview')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /forecast spotlight for the next customer-facing release/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('Reskin-ready')).toBeInTheDocument();
    expect(screen.getByText('Feels like')).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /open component brief/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders custom priority messaging and custom metrics', () => {
    render(
      <ForecastSpotlightPanel
        priority="severe"
        headline="Storm escalation playbook"
        badges={['Ops handoff']}
        metrics={[
          {
            label: 'Rain bands',
            value: '3',
            caption: 'Successive cells crossing downtown',
          },
        ]}
      />,
    );

    expect(screen.getByText('Rapid Response')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /storm escalation playbook/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('Ops handoff')).toBeInTheDocument();
    expect(screen.getByText('Rain bands')).toBeInTheDocument();
    expect(screen.getByText(/carbon tiles, tags, and actions/i)).toBeInTheDocument();
  });
});
