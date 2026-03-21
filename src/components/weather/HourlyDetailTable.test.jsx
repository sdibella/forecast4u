import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HourlyDetailTable from './HourlyDetailTable';

describe('HourlyDetailTable', () => {
  it('renders nothing when no intervals are available', () => {
    const { container } = render(<HourlyDetailTable intervals={[]} dayLabel="Today" />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders the formatted hourly forecast details', () => {
    render(
      <HourlyDetailTable
        dayLabel="Today"
        intervals={[
          {
            time: '2026-03-21T09:00',
            temperature: 72,
            feelsLike: 70,
            precipProbability: 20,
            humidity: 45,
            weatherCode: 2,
            windSpeed: 10,
            windDirection: 180,
            uvIndex: 4.2,
            isDay: true,
          },
        ]}
      />
    );

    expect(screen.getByRole('heading', { name: /3-Hour Forecast/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Temp (°F)' })).toBeInTheDocument();
    expect(screen.getByText('9 AM')).toBeInTheDocument();
    expect(screen.getByText(/Partly cloudy/)).toBeInTheDocument();
    expect(screen.getByText('72°')).toBeInTheDocument();
    expect(screen.getByText('70°')).toBeInTheDocument();
    expect(screen.getByText('20%')).toBeInTheDocument();
    expect(screen.getByText('45%')).toBeInTheDocument();
    expect(screen.getByText('10 mph S')).toBeInTheDocument();
    expect(screen.getByText('4.2')).toBeInTheDocument();
  });
});
