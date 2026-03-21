import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CatchAllPage from './CatchAllPage';

const { builderGet } = vi.hoisted(() => ({
  builderGet: vi.fn(),
}));

vi.mock('@builder.io/react', () => ({
  builder: {
    get: builderGet,
  },
  BuilderComponent: ({ content }) => (
    <div data-testid="builder-page">{content?.id || 'builder-page-content'}</div>
  ),
}));

function renderPage(pathname = '/marketing') {
  return render(
    <MemoryRouter initialEntries={[pathname]}>
      <CatchAllPage />
    </MemoryRouter>
  );
}

describe('CatchAllPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads and renders Builder-managed page content', async () => {
    builderGet.mockReturnValue({
      promise: () => Promise.resolve({ id: 'page-1' }),
    });

    renderPage('/about');

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('builder-page')).toHaveTextContent('page-1');
    });

    expect(builderGet).toHaveBeenCalledWith('page', { url: '/about' });
  });

  it('shows a 404 state when Builder returns no content', async () => {
    builderGet.mockReturnValue({
      promise: () => Promise.resolve(null),
    });

    renderPage('/missing');

    await waitFor(() => {
      expect(screen.getByText('404')).toBeInTheDocument();
    });

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('shows a 404 state when Builder content loading fails', async () => {
    builderGet.mockReturnValue({
      promise: () => Promise.reject(new Error('Builder request failed')),
    });

    renderPage('/error');

    await waitFor(() => {
      expect(screen.getByText('404')).toBeInTheDocument();
    });

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
