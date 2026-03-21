import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter, useLocation } from 'react-router-dom';
import AppHeader from './AppHeader';

function HeaderHarness(props) {
  const location = useLocation();

  return (
    <>
      <AppHeader {...props} />
      <div data-testid="pathname">{location.pathname}</div>
    </>
  );
}

describe('AppHeader', () => {
  it('navigates back to the home route when the product name is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/weather/10001']}>
        <HeaderHarness isDark={false} onToggleTheme={vi.fn()} onDetectLocation={vi.fn()} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('link', { name: /Forecast4U/i }));

    expect(screen.getByTestId('pathname')).toHaveTextContent('/');
  });

  it('fires the location and theme callbacks from the header actions', () => {
    const onDetectLocation = vi.fn();
    const onToggleTheme = vi.fn();

    render(
      <MemoryRouter>
        <HeaderHarness isDark={false} onToggleTheme={onToggleTheme} onDetectLocation={onDetectLocation} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByLabelText('Detect my location'));
    fireEvent.click(screen.getByLabelText('Switch to dark mode'));

    expect(onDetectLocation).toHaveBeenCalledTimes(1);
    expect(onToggleTheme).toHaveBeenCalledTimes(1);
  });
});
