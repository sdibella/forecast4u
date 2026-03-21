import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SkeletonForecast from './SkeletonForecast';

describe('SkeletonForecast', () => {
  it('renders the forecast skeleton placeholders for the loading state', () => {
    const { container } = render(<SkeletonForecast />);

    expect(container.querySelectorAll('.cds--skeleton__text').length).toBeGreaterThan(0);
    expect(container.querySelectorAll('.cds--skeleton__placeholder').length).toBeGreaterThan(0);
    expect(container.querySelectorAll('.cds--tile').length).toBeGreaterThanOrEqual(3);
  });
});
