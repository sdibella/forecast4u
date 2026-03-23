import React from 'react';
import ForecastSpotlightPanel from './ForecastSpotlightPanel';

export default {
  title: 'Forecast4U/ForecastSpotlightPanel',
  component: ForecastSpotlightPanel,
  tags: ['autodocs'],
  argTypes: {
    priority: {
      control: 'select',
      options: ['calm', 'watch', 'severe'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A production-style Carbon composition for the design team. It is intentionally more branded and opinionated than a base component so the team has a clear reskin target inside Storybook.',
      },
    },
  },
};

export const LaunchReady = {
  args: {
    priority: 'calm',
    headline: 'Sun-filled product reveal for the spring travel push',
    summary:
      'Designed as a premium hero composition for campaign pages or operational dashboards. The badges, metric tiles, and CTAs all stay inside a Carbon-friendly structure while leaving room for brand expression.',
    badges: ['Launch ready', 'Brand-forward', 'Builder handoff'],
    metrics: [
      {
        label: 'Temperature',
        value: '72F',
        caption: 'Comfortable all-day conditions',
      },
      {
        label: 'Sun coverage',
        value: '88%',
        caption: 'Bright conditions for lifestyle imagery',
      },
      {
        label: 'Traffic lift',
        value: '+14%',
        caption: 'Projected interest versus last weekend',
      },
      {
        label: 'Refresh cadence',
        value: '15 min',
        caption: 'Tuned for near-real-time storytelling',
      },
    ],
  },
};

export const StormResponse = {
  args: {
    priority: 'severe',
    locationName: 'Chicago, IL',
    timestamp: 'Updated 2 minutes ago',
    headline: 'High-urgency storm response layout for service teams',
    summary:
      'This variant shows how the same composition can pivot into an alert-led experience with stronger emphasis, denser metrics, and more defensive messaging while still feeling on-brand.',
    badges: ['Critical state', 'Ops aligned', 'Executive-ready'],
    metrics: [
      {
        label: 'Rain bands',
        value: '3',
        caption: 'Successive cells crossing downtown',
      },
      {
        label: 'Wind gusts',
        value: '47 mph',
        caption: 'Peak risk over the next 90 minutes',
      },
      {
        label: 'Dispatch load',
        value: 'High',
        caption: 'Support queues should prepare for spikes',
      },
      {
        label: 'Recovery window',
        value: '6 PM',
        caption: 'Visibility improves after the frontal pass',
      },
    ],
    primaryActionLabel: 'Review escalation plan',
    secondaryActionLabel: 'Preview mobile priority',
  },
};

export const ExecutiveReview = {
  args: {
    priority: 'watch',
    locationName: 'Austin, TX',
    timestamp: 'Updated 25 minutes ago',
    headline: 'Executive snapshot for a branded weather experience',
    summary:
      'A middle-ground state built for stakeholder reviews. The hierarchy is polished enough for demos, but modular enough for designers to restyle tokens, spacing, or typography in a future production pass.',
    badges: ['Stakeholder review', 'Modular layout', 'Token-first'],
    metrics: [
      {
        label: 'Market mood',
        value: 'Stable',
        caption: 'Low-friction forecast supports conversion',
      },
      {
        label: 'Humidity',
        value: '41%',
        caption: 'Dry air keeps the layout feeling calm',
      },
      {
        label: 'Wind',
        value: '12 mph',
        caption: 'Enough movement for a dynamic visual story',
      },
      {
        label: 'Alert posture',
        value: 'Watch',
        caption: 'Subtle urgency without turning alarmist',
      },
    ],
    primaryActionLabel: 'Share with design',
    secondaryActionLabel: 'Inspect light theme',
  },
};
