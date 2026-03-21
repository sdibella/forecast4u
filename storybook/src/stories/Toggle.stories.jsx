import { Toggle, Grid, Column, Tile } from '@carbon/react';

export default {
  title: 'Carbon/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    disabled: { control: 'boolean' },
  },
};

export const Default = {
  args: {
    id: 'toggle-default',
    labelText: 'Dark Mode',
    labelA: 'Off',
    labelB: 'On',
  },
};

export const Small = {
  args: {
    id: 'toggle-small',
    labelText: 'Compact Toggle',
    labelA: 'Off',
    labelB: 'On',
    size: 'sm',
  },
};

export const SettingsPanel = {
  render: () => (
    <Tile style={{ maxWidth: '400px', padding: '1.5rem' }}>
      <h4 style={{ marginBottom: '1.5rem' }}>Display Settings</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Toggle id="dark-mode" labelText="Dark Mode" labelA="Light" labelB="Dark" />
        <Toggle id="temp-unit" labelText="Temperature Unit" labelA="°F" labelB="°C" />
        <Toggle id="wind-unit" labelText="Wind Speed Unit" labelA="mph" labelB="km/h" />
        <Toggle id="animations" labelText="Animations" labelA="Off" labelB="On" defaultToggled />
        <Toggle id="auto-refresh" labelText="Auto-Refresh" labelA="Off" labelB="On" defaultToggled />
      </div>
    </Tile>
  ),
};
