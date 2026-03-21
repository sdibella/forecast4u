import { Button } from '@carbon/react';
import { Add, TrashCan, Download, ArrowRight } from '@carbon/react/icons';

export default {
  title: 'Carbon/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    kind: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger', 'danger--tertiary', 'danger--ghost', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    disabled: { control: 'boolean' },
  },
};

export const Primary = {
  args: {
    children: 'Primary Button',
    kind: 'primary',
  },
};

export const Secondary = {
  args: {
    children: 'Secondary Button',
    kind: 'secondary',
  },
};

export const Tertiary = {
  args: {
    children: 'Tertiary Button',
    kind: 'tertiary',
  },
};

export const Danger = {
  args: {
    children: 'Danger Button',
    kind: 'danger',
  },
};

export const Ghost = {
  args: {
    children: 'Ghost Button',
    kind: 'ghost',
  },
};

export const WithIcon = {
  args: {
    children: 'Add item',
    kind: 'primary',
    renderIcon: Add,
  },
};

export const IconOnly = {
  args: {
    kind: 'ghost',
    hasIconOnly: true,
    renderIcon: TrashCan,
    iconDescription: 'Delete',
    tooltipPosition: 'bottom',
  },
};

export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">XL</Button>
      <Button size="2xl">2XL</Button>
    </div>
  ),
};

export const AllKinds = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button kind="primary">Primary</Button>
      <Button kind="secondary">Secondary</Button>
      <Button kind="tertiary">Tertiary</Button>
      <Button kind="danger">Danger</Button>
      <Button kind="ghost">Ghost</Button>
    </div>
  ),
};
