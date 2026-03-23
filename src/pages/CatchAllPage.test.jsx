import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate };
});

import CatchAllPage from './CatchAllPage';

function renderPage() {
  return render(
    <MemoryRouter>
      <CatchAllPage />
    </MemoryRouter>
  );
}

describe('CatchAllPage', () => {
  it('renders 404 heading and message', () => {
    renderPage();
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('navigates home when back button is clicked', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /back to home/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
