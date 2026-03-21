import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import WeatherPage from './WeatherPage';
import { useWeather } from '../hooks/useWeather';
import { useSavedLocations } from '../hooks/useSavedLocations';

const { builderGet } = vi.hoisted(() => ({
  builderGet: vi.fn(),
}));

vi.mock('@builder.io/react', () => ({
  builder: {
    get: builderGet,
  },
  BuilderComponent: ({ model, content }) => (
    <div data-testid={`builder-${model}`}>{content?.id || 'builder-content'}</div>
  ),
}));

vi.mock('../hooks/useWeather', () => ({
  useWeather: vi.fn(),
}));

vi.mock('../hooks/useSavedLocations', () => ({
  useSavedLocations: vi.fn(),
}));

vi.mock('../components/weather/CurrentConditions', () => ({
  default: ({ locationName, locationState }) => (
    <div data-testid="current-conditions">
      {locationName}
      {locationState ? `, ${locationState}` : ''}
    </div>
  ),
}));

vi.mock('../components/weather/DailyForecastCard', () => ({
  default: ({ day, isSelected, onClick }) => (
    <button data-testid={`forecast-day-${day.date}`} onClick={onClick}>
      {day.date}:{isSelected ? 'selected' : 'idle'}
    </button>
  ),
}));

vi.mock('../components/weather/ForecastChart', () => ({
  default: ({ intervals, dayLabel }) => (
    <div data-testid="forecast-chart">
      {dayLabel}:{intervals[0]?.time}
    </div>
  ),
}));

vi.mock('../components/weather/HourlyDetailTable', () => ({
  default: ({ intervals, dayLabel }) => (
    <div data-testid="hourly-table">
      {dayLabel}:{intervals[0]?.time}
    </div>
  ),
}));

vi.mock('../components/common/SkeletonForecast', () => ({
  default: () => <div data-testid="skeleton-forecast">Loading forecast</div>,
}));

function renderWeatherPage() {
  return render(
    <MemoryRouter initialEntries={['/weather/10001']}>
      <Routes>
        <Route path="/" element={<div data-testid="home-route">Home</div>} />
        <Route path="/weather/:zip" element={<WeatherPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('WeatherPage', () => {
  const addLocation = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useSavedLocations.mockReturnValue({ addLocation });
    builderGet.mockReturnValue({
      promise: () => Promise.resolve(null),
    });
  });

  it('shows the loading skeleton while forecast data is loading', () => {
    useWeather.mockReturnValue({
      data: null,
      location: null,
      loading: true,
      error: null,
    });

    renderWeatherPage();

    expect(screen.getByTestId('skeleton-forecast')).toBeInTheDocument();
  });

  it('shows an error state when the forecast request fails', () => {
    useWeather.mockReturnValue({
      data: null,
      location: null,
      loading: false,
      error: 'Unable to load weather data.',
    });

    renderWeatherPage();

    expect(screen.getByText('Error loading forecast')).toBeInTheDocument();
    expect(screen.getByText('Unable to load weather data.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back to search' })).toBeInTheDocument();
  });

  it('renders the forecast, saves the location, and updates the selected day', async () => {
    useWeather.mockReturnValue({
      loading: false,
      error: null,
      location: {
        name: 'New York',
        state: 'NY',
      },
      data: {
        current: { temperature: 72 },
        forecastByDay: [
          {
            date: '2026-03-21',
            intervals: [{ time: '2026-03-21T09:00' }],
          },
          {
            date: '2026-03-22',
            intervals: [{ time: '2026-03-22T12:00' }],
          },
        ],
      },
    });
    builderGet.mockReturnValue({
      promise: () => Promise.resolve({ id: 'weather-content' }),
    });

    renderWeatherPage();

    await waitFor(() => {
      expect(addLocation).toHaveBeenCalledWith('10001', 'New York', 'NY');
    });

    expect(builderGet).toHaveBeenCalledWith('weather-page', { url: '/weather/10001' });
    expect(screen.getByTestId('current-conditions')).toHaveTextContent('New York, NY');
    expect(screen.getByTestId('forecast-day-2026-03-21')).toHaveTextContent('selected');
    expect(screen.getByTestId('forecast-chart')).toHaveTextContent('2026-03-21T09:00');
    expect(screen.getByTestId('hourly-table')).toHaveTextContent('2026-03-21T09:00');

    fireEvent.click(screen.getByTestId('forecast-day-2026-03-22'));

    expect(screen.getByTestId('forecast-chart')).toHaveTextContent('2026-03-22T12:00');
    expect(screen.getByTestId('hourly-table')).toHaveTextContent('2026-03-22T12:00');

    await waitFor(() => {
      expect(screen.getByTestId('builder-weather-page')).toHaveTextContent('weather-content');
    });
  });
});
