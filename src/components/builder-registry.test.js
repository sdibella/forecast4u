import { beforeEach, describe, expect, it, vi } from 'vitest';

const registerComponent = vi.fn();

vi.mock('@builder.io/react', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    Builder: {
      registerComponent,
    },
  };
});

describe('builder-registry', () => {
  beforeEach(() => {
    vi.resetModules();
    registerComponent.mockClear();
  });

  it('registers the Carbon and Forecast4U components with Builder.io', async () => {
    await import('./builder-registry');

    const registeredNames = registerComponent.mock.calls.map(([, config]) => config.name);

    expect(registeredNames).toEqual(
      expect.arrayContaining([
        'Carbon Button',
        'Carbon Text Input',
        'Carbon Search',
        'Carbon Tile',
        'Carbon Clickable Tile',
        'Carbon Tag',
        'Carbon Notification',
        'Carbon Toggle',
        'Carbon Link',
        'Current Conditions',
        'Daily Forecast Card',
        'Forecast Chart',
        'Hourly Detail Table',
      ])
    );
  });
});
