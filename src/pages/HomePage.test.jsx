import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { MemoryRouter, Route, Routes, useParams } from 'react-router-dom';
import HomePage from './HomePage';
import { useSavedLocations } from '../hooks/useSavedLocations';

vi.mock('../hooks/useSavedLocations', () => ({
  useSavedLocations: vi.fn(),
}));

function WeatherDestination() {
  const { zip } = useParams();
  return <div data-testid="weather-destination">{zip}</div>;
}

function renderHomePage(props = {}) {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route
          path="/"
          element={<HomePage onDetectLocation={vi.fn()} detectingLocation={false} {...props} />}
        />
        <Route path="/weather/:zip" element={<WeatherDestination />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useSavedLocations.mockReturnValue({
      locations: [],
      removeLocation: vi.fn(),
    });
  });

  it('navigates to the weather route for a valid ZIP search', () => {
    renderHomePage();

    fireEvent.change(screen.getByLabelText(/Search by ZIP code/i), {
      target: { value: '10001' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Go' }));

    expect(screen.getByTestId('weather-destination')).toHaveTextContent('10001');
  });

  it('keeps the submit button disabled for invalid ZIP values and shows the detecting state', () => {
    const onDetectLocation = vi.fn();

    renderHomePage({
      onDetectLocation,
      detectingLocation: true,
    });

    fireEvent.change(screen.getByLabelText(/Search by ZIP code/i), {
      target: { value: 'abc' },
    });

    expect(screen.getByRole('button', { name: 'Go' })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'Detecting...' }));

    expect(onDetectLocation).not.toHaveBeenCalled();
  });

  it('renders saved locations, lets the user revisit them, and removes them on request', () => {
    const removeLocation = vi.fn();
    useSavedLocations.mockReturnValue({
      locations: [{ zip: '10001', name: 'New York', state: 'NY' }],
      removeLocation,
    });

    renderHomePage();

    fireEvent.click(screen.getByText('New York'));

    expect(screen.getByTestId('weather-destination')).toHaveTextContent('10001');

    renderHomePage();

    fireEvent.click(screen.getByLabelText('Remove'));

    expect(removeLocation).toHaveBeenCalledWith('10001');
  });
});
