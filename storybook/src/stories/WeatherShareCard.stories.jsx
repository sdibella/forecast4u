import React from 'react';
import WeatherShareCard from './WeatherShareCard';

export default {
  title: 'Forecast4U/WeatherShareCard',
  component: WeatherShareCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A shareable forecast card — new component proposed for the design team review. ' +
          'Not yet in the production app. Uses Carbon Layer, Divider, Button, and Tag with ' +
          'token-driven colors throughout. Switch to "Forecast4U Brand" in the theme toolbar ' +
          'to preview how the accent bar, icon color, and share button respond to the rebrand.',
      },
    },
  },
  argTypes: {
    condition: {
      control: 'select',
      options: ['sunny', 'cloudy', 'rainy', 'stormy', 'snowy', 'windy'],
    },
    tempHigh: { control: { type: 'range', min: -20, max: 120, step: 1 } },
    tempLow: { control: { type: 'range', min: -30, max: 110, step: 1 } },
    precipitation: { control: { type: 'range', min: 0, max: 100, step: 5 } },
    humidity: { control: { type: 'range', min: 0, max: 100, step: 5 } },
    wind: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
};

export const SunnyDay = {
  name: 'Sunny day',
  args: {
    city: 'New York',
    state: 'NY',
    zip: '10001',
    condition: 'sunny',
    tempHigh: 74,
    tempLow: 58,
    precipitation: 5,
    humidity: 42,
    wind: 9,
    date: 'Saturday, March 22',
  },
};

export const StormAlert = {
  name: 'Storm alert',
  args: {
    city: 'Chicago',
    state: 'IL',
    zip: '60601',
    condition: 'stormy',
    tempHigh: 51,
    tempLow: 38,
    precipitation: 85,
    humidity: 91,
    wind: 34,
    date: 'Sunday, March 23',
  },
};

export const WinterConditions = {
  name: 'Winter conditions',
  args: {
    city: 'Denver',
    state: 'CO',
    zip: '80201',
    condition: 'snowy',
    tempHigh: 28,
    tempLow: 14,
    precipitation: 70,
    humidity: 68,
    wind: 18,
    date: 'Monday, March 24',
  },
};

export const CoastalWind = {
  name: 'Coastal wind',
  args: {
    city: 'Miami',
    state: 'FL',
    zip: '33101',
    condition: 'windy',
    tempHigh: 82,
    tempLow: 71,
    precipitation: 20,
    humidity: 78,
    wind: 22,
    date: 'Tuesday, March 25',
  },
};
