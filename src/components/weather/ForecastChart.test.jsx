import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ForecastChart from './ForecastChart';

vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
  ComposedChart: ({ data, children }) => (
    <div data-testid="composed-chart">
      {JSON.stringify(data)}
      {children}
    </div>
  ),
  Area: ({ name, dataKey }) => <div data-testid={`area-${dataKey}`}>{name}</div>,
  Bar: ({ name, dataKey }) => <div data-testid={`bar-${dataKey}`}>{name}</div>,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Legend: () => null,
}));

describe('ForecastChart', () => {
  it('renders nothing when no intervals are provided', () => {
    const { container } = render(<ForecastChart intervals={[]} dayLabel="Today" />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders the heading and transformed chart data for the selected day', () => {
    render(
      <ForecastChart
        dayLabel="Today"
        intervals={[
          {
            time: '2026-03-21T09:00',
            temperature: 68,
            feelsLike: 67,
            precipProbability: 10,
            humidity: 45,
            windSpeed: 9,
          },
        ]}
      />
    );

    expect(screen.getByRole('heading', { name: /Temperature & Precipitation/i })).toBeInTheDocument();
    expect(screen.getByTestId('composed-chart')).toHaveTextContent('"time":"9 AM"');
    expect(screen.getByTestId('composed-chart')).toHaveTextContent('"temperature":68');
    expect(screen.getByTestId('area-temperature')).toHaveTextContent('Temp');
    expect(screen.getByTestId('bar-precipitation')).toHaveTextContent('Precip %');
  });
});
