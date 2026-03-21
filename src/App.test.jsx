import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { builderInit, useThemeMock, useGeolocationMock } = vi.hoisted(() => ({
  builderInit: vi.fn(),
  useThemeMock: vi.fn(),
  useGeolocationMock: vi.fn(),
}));

vi.mock('@builder.io/react', () => ({
  builder: {
    init: builderInit,
  },
}));

vi.mock('./components/builder-registry', () => ({}));

vi.mock('./hooks/useTheme', () => ({
  useTheme: useThemeMock,
}));

vi.mock('./hooks/useGeolocation', () => ({
  useGeolocation: useGeolocationMock,
}));

vi.mock('./components/layout/AppHeader', () => ({
  default: ({ onToggleTheme, onDetectLocation }) => (
    <div>
      <button onClick={onToggleTheme}>toggle-theme</button>
      <button onClick={onDetectLocation}>detect-location</button>
    </div>
  ),
}));

vi.mock('./pages/HomePage', () => ({
  default: ({ detectingLocation }) => (
    <div data-testid="home-page">home:{String(detectingLocation)}</div>
  ),
}));

vi.mock('./pages/WeatherPage', () => ({
  default: () => <div data-testid="weather-page">weather page</div>,
}));

vi.mock('./pages/CatchAllPage', () => ({
  default: () => <div data-testid="catch-all-page">catch all page</div>,
}));

import App from './App';

describe('App', () => {
  beforeEach(() => {
    useThemeMock.mockReset();
    useGeolocationMock.mockReset();
    useThemeMock.mockReturnValue({
      theme: 'white',
      isDark: false,
      toggleTheme: vi.fn(),
    });
    useGeolocationMock.mockReturnValue({
      location: null,
      detecting: false,
      error: null,
      detect: vi.fn(),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    window.history.pushState({}, '', '/');
  });

  it('initializes Builder and renders the home route by default', () => {
    window.history.pushState({}, '', '/');

    render(<App />);

    expect(builderInit).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('home-page')).toHaveTextContent('home:false');
  });

  it('wires the header actions to the theme and geolocation hooks', () => {
    const toggleTheme = vi.fn();
    const detect = vi.fn();

    useThemeMock.mockReturnValue({
      theme: 'white',
      isDark: false,
      toggleTheme,
    });
    useGeolocationMock.mockReturnValue({
      location: null,
      detecting: false,
      error: null,
      detect,
    });

    render(<App />);

    fireEvent.click(screen.getByText('toggle-theme'));
    fireEvent.click(screen.getByText('detect-location'));

    expect(toggleTheme).toHaveBeenCalledTimes(1);
    expect(detect).toHaveBeenCalledTimes(1);
  });

  it('renders the weather route for a weather URL', () => {
    window.history.pushState({}, '', '/weather/10001');

    render(<App />);

    expect(screen.getByTestId('weather-page')).toBeInTheDocument();
  });

});
