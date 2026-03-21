import {
  InlineNotification,
  ToastNotification,
  ActionableNotification,
} from '@carbon/react';

export default {
  title: 'Carbon/Notification',
  component: InlineNotification,
  tags: ['autodocs'],
  argTypes: {
    kind: {
      control: 'select',
      options: ['error', 'info', 'info-square', 'success', 'warning', 'warning-alt'],
    },
  },
};

export const Inline = {
  args: {
    kind: 'info',
    title: 'Forecast Updated',
    subtitle: 'Weather data has been refreshed with the latest observations.',
    lowContrast: false,
  },
};

export const InlineError = {
  args: {
    kind: 'error',
    title: 'Location Not Found',
    subtitle: 'The ZIP code you entered could not be resolved. Please check and try again.',
  },
};

export const InlineSuccess = {
  args: {
    kind: 'success',
    title: 'Location Saved',
    subtitle: 'Beverly Hills, CA has been added to your saved locations.',
  },
};

export const InlineWarning = {
  args: {
    kind: 'warning',
    title: 'API Rate Limit',
    subtitle: 'Weather data requests are being throttled. Some forecasts may be delayed.',
  },
};

export const AllKinds = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <InlineNotification kind="error" title="Error" subtitle="Something went wrong." />
      <InlineNotification kind="warning" title="Warning" subtitle="Proceed with caution." />
      <InlineNotification kind="info" title="Info" subtitle="Here is some information." />
      <InlineNotification kind="success" title="Success" subtitle="Operation completed." />
    </div>
  ),
};

export const Toast = {
  render: () => (
    <ToastNotification
      kind="success"
      title="Forecast Loaded"
      subtitle="5-day forecast for 90210 is ready."
      caption="Just now"
      timeout={0}
    />
  ),
};

export const Actionable = {
  render: () => (
    <ActionableNotification
      kind="warning"
      title="Severe Weather Alert"
      subtitle="A thunderstorm warning is in effect for your area."
      actionButtonLabel="View Details"
      onActionButtonClick={() => {}}
    />
  ),
};
