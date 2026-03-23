import React from 'react';
import { TextInput, NumberInput, PasswordInput, Search, TextArea } from '@carbon/react';

export default {
  title: 'Carbon/Text Input',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    warn: { control: 'boolean' },
  },
};

export const Default = {
  args: {
    id: 'text-input-1',
    labelText: 'Label',
    placeholder: 'Placeholder text',
    helperText: 'Optional helper text',
  },
};

export const WithWarning = {
  args: {
    id: 'text-input-warn',
    labelText: 'Username',
    placeholder: 'Enter username',
    warn: true,
    warnText: 'This username is already taken',
  },
};

export const Invalid = {
  args: {
    id: 'text-input-invalid',
    labelText: 'Email',
    placeholder: 'Enter email',
    invalid: true,
    invalidText: 'Please enter a valid email address',
  },
};

export const Disabled = {
  args: {
    id: 'text-input-disabled',
    labelText: 'Disabled Input',
    placeholder: 'Cannot type here',
    disabled: true,
  },
};

export const InputVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
      <TextInput id="ti-1" labelText="Text Input" placeholder="Enter text..." />
      <NumberInput id="ni-1" label="Number Input" min={0} max={100} value={50} />
      <PasswordInput id="pi-1" labelText="Password" placeholder="Enter password..." />
      <Search id="si-1" labelText="Search" placeholder="Search..." />
      <TextArea id="ta-1" labelText="Text Area" placeholder="Write a longer message..." rows={4} />
    </div>
  ),
};
