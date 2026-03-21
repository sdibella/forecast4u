import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CurrentConditions from './CurrentConditions';

describe('CurrentConditions', () => {
  it('renders the main weather summary and supporting details', () => {
    render(
      <CurrentConditions
        current={{
          temperature: 72,
          feelsLike: 70,
          humidity: 45,
          weatherCode: 2,
          windSpeed: 10,
          windDirection: 180,
          isDay: true,
          precipitation: 0,
          cloudCover: 20,
          pressure: 1012,
        }}
        locationName="New York"
        locationState="NY"
      />
    );

    expect(screen.getByText('Current Weather')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'New York, NY' })).toBeInTheDocument();
    expect(screen.getByText('Partly cloudy')).toBeInTheDocument();
    expect(screen.getByText(/Feels like 70°F/)).toBeInTheDocument();
    expect(screen.getByText('45%')).toBeInTheDocument();
    expect(screen.getByText('10 mph S')).toBeInTheDocument();
    expect(screen.getByText('20%')).toBeInTheDocument();
    expect(screen.getByText('1012 hPa')).toBeInTheDocument();
  });
});
