import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import DailyForecastCard from './DailyForecastCard';

describe('DailyForecastCard', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-21T09:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders today, highlights the selected card, and handles clicks', () => {
    const onClick = vi.fn();
    const { container } = render(
      <DailyForecastCard
        day={{
          date: '2026-03-21',
          weatherCode: 1,
          tempMax: 75,
          tempMin: 55,
          precipProbMax: 20,
          windSpeedMax: 12,
        }}
        isSelected
        onClick={onClick}
      />
    );

    fireEvent.click(container.firstChild);

    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('20% precip')).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle('border: 2px solid var(--cds-interactive)');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders a formatted date and no-precipitation text when appropriate', () => {
    render(
      <DailyForecastCard
        day={{
          date: '2026-03-22',
          weatherCode: 3,
          tempMax: 60,
          tempMin: 42,
          precipProbMax: 0,
          windSpeedMax: 8,
        }}
        isSelected={false}
        onClick={vi.fn()}
      />
    );

    expect(screen.getByText(/Mar 22/)).toBeInTheDocument();
    expect(screen.getByText('No precip')).toBeInTheDocument();
    expect(screen.getByText('Wind 8 mph')).toBeInTheDocument();
  });
});
