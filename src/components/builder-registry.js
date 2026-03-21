/**
 * Builder.io Custom Component Registry
 *
 * Registers IBM Carbon components and custom Forecast4U components
 * with Builder.io's visual editor, enabling drag-and-drop editing.
 *
 * IMPORTANT: This file must be imported BEFORE builder.init() is called.
 */
import { Builder } from '@builder.io/react';
import {
  Button,
  TextInput,
  Search,
  Tile,
  ClickableTile,
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
  Tag,
  Accordion,
  AccordionItem,
  InlineNotification,
  Toggle,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Link,
  Grid,
  Column,
} from '@carbon/react';
import CurrentConditions from './weather/CurrentConditions';
import DailyForecastCard from './weather/DailyForecastCard';
import ForecastChart from './weather/ForecastChart';
import HourlyDetailTable from './weather/HourlyDetailTable';

// ─── IBM CARBON COMPONENTS ────────────────────────────────────────────

Builder.registerComponent(Button, {
  name: 'Carbon Button',
  image: 'https://cdn.builder.io/api/v1/image/assets%2Fpoc%2F3d5b5a3e-0a3a-4e2a-8b1e-3a0c8e7b6a5c',
  inputs: [
    { name: 'children', type: 'string', defaultValue: 'Click me', friendlyName: 'Label' },
    {
      name: 'kind',
      type: 'string',
      enum: ['primary', 'secondary', 'tertiary', 'danger', 'danger--tertiary', 'danger--ghost', 'ghost'],
      defaultValue: 'primary',
    },
    { name: 'size', type: 'string', enum: ['sm', 'md', 'lg', 'xl', '2xl'], defaultValue: 'md' },
    { name: 'disabled', type: 'boolean', defaultValue: false },
    { name: 'href', type: 'string', helperText: 'Optional URL to navigate to' },
  ],
});

Builder.registerComponent(TextInput, {
  name: 'Carbon Text Input',
  inputs: [
    { name: 'id', type: 'string', required: true, defaultValue: 'text-input-1' },
    { name: 'labelText', type: 'string', defaultValue: 'Label' },
    { name: 'placeholder', type: 'string', defaultValue: 'Enter text...' },
    { name: 'helperText', type: 'string', defaultValue: '' },
    { name: 'type', type: 'string', enum: ['text', 'email', 'password', 'number', 'tel', 'url'], defaultValue: 'text' },
    { name: 'disabled', type: 'boolean', defaultValue: false },
    { name: 'invalid', type: 'boolean', defaultValue: false },
    { name: 'invalidText', type: 'string', defaultValue: 'Invalid input' },
    { name: 'size', type: 'string', enum: ['sm', 'md', 'lg'], defaultValue: 'md' },
  ],
});

Builder.registerComponent(Search, {
  name: 'Carbon Search',
  inputs: [
    { name: 'id', type: 'string', required: true, defaultValue: 'search-1' },
    { name: 'labelText', type: 'string', defaultValue: 'Search' },
    { name: 'placeholder', type: 'string', defaultValue: 'Search...' },
    { name: 'size', type: 'string', enum: ['sm', 'md', 'lg'], defaultValue: 'lg' },
    { name: 'disabled', type: 'boolean', defaultValue: false },
  ],
});

Builder.registerComponent(Tile, {
  name: 'Carbon Tile',
  canHaveChildren: true,
  inputs: [
    { name: 'light', type: 'boolean', defaultValue: false },
  ],
});

Builder.registerComponent(ClickableTile, {
  name: 'Carbon Clickable Tile',
  canHaveChildren: true,
  inputs: [
    { name: 'href', type: 'string', helperText: 'URL to navigate to' },
    { name: 'disabled', type: 'boolean', defaultValue: false },
  ],
});

Builder.registerComponent(Tag, {
  name: 'Carbon Tag',
  inputs: [
    { name: 'children', type: 'string', defaultValue: 'Tag', friendlyName: 'Label' },
    {
      name: 'type',
      type: 'string',
      enum: ['red', 'magenta', 'purple', 'blue', 'cyan', 'teal', 'green', 'gray', 'cool-gray', 'warm-gray', 'high-contrast', 'outline'],
      defaultValue: 'gray',
    },
    { name: 'size', type: 'string', enum: ['sm', 'md'], defaultValue: 'md' },
    { name: 'disabled', type: 'boolean', defaultValue: false },
  ],
});

Builder.registerComponent(InlineNotification, {
  name: 'Carbon Notification',
  inputs: [
    { name: 'title', type: 'string', defaultValue: 'Notification title' },
    { name: 'subtitle', type: 'string', defaultValue: 'Subtitle text' },
    { name: 'kind', type: 'string', enum: ['error', 'info', 'info-square', 'success', 'warning', 'warning-alt'], defaultValue: 'info' },
    { name: 'lowContrast', type: 'boolean', defaultValue: false },
    { name: 'hideCloseButton', type: 'boolean', defaultValue: false },
  ],
});

Builder.registerComponent(Toggle, {
  name: 'Carbon Toggle',
  inputs: [
    { name: 'id', type: 'string', required: true, defaultValue: 'toggle-1' },
    { name: 'labelText', type: 'string', defaultValue: 'Toggle label' },
    { name: 'labelA', type: 'string', defaultValue: 'Off' },
    { name: 'labelB', type: 'string', defaultValue: 'On' },
    { name: 'size', type: 'string', enum: ['sm', 'md'], defaultValue: 'md' },
    { name: 'disabled', type: 'boolean', defaultValue: false },
    { name: 'defaultToggled', type: 'boolean', defaultValue: false },
  ],
});

Builder.registerComponent(Link, {
  name: 'Carbon Link',
  inputs: [
    { name: 'children', type: 'string', defaultValue: 'Link text', friendlyName: 'Label' },
    { name: 'href', type: 'string', defaultValue: '#' },
    { name: 'size', type: 'string', enum: ['sm', 'md', 'lg'], defaultValue: 'md' },
    { name: 'disabled', type: 'boolean', defaultValue: false },
    { name: 'inline', type: 'boolean', defaultValue: false },
  ],
});

// ─── CUSTOM FORECAST4U COMPONENTS ─────────────────────────────────────

Builder.registerComponent(CurrentConditions, {
  name: 'Current Conditions',
  inputs: [
    {
      name: 'current',
      type: 'object',
      defaultValue: {
        temperature: 72,
        feelsLike: 70,
        humidity: 45,
        weatherCode: 1,
        windSpeed: 8,
        windDirection: 180,
        isDay: true,
        precipitation: 0,
        cloudCover: 20,
        pressure: 1013,
      },
      subFields: [
        { name: 'temperature', type: 'number' },
        { name: 'feelsLike', type: 'number' },
        { name: 'humidity', type: 'number' },
        { name: 'weatherCode', type: 'number' },
        { name: 'windSpeed', type: 'number' },
        { name: 'windDirection', type: 'number' },
        { name: 'isDay', type: 'boolean' },
        { name: 'precipitation', type: 'number' },
        { name: 'cloudCover', type: 'number' },
        { name: 'pressure', type: 'number' },
      ],
    },
    { name: 'locationName', type: 'string', defaultValue: 'New York' },
    { name: 'locationState', type: 'string', defaultValue: 'NY' },
  ],
});

Builder.registerComponent(DailyForecastCard, {
  name: 'Daily Forecast Card',
  inputs: [
    {
      name: 'day',
      type: 'object',
      defaultValue: {
        date: '2026-03-21',
        weatherCode: 1,
        tempMax: 75,
        tempMin: 55,
        precipProbMax: 10,
        windSpeedMax: 12,
      },
    },
    { name: 'isSelected', type: 'boolean', defaultValue: false },
  ],
});

Builder.registerComponent(ForecastChart, {
  name: 'Forecast Chart',
  inputs: [
    {
      name: 'intervals',
      type: 'list',
      defaultValue: [],
      subFields: [
        { name: 'time', type: 'string' },
        { name: 'temperature', type: 'number' },
        { name: 'feelsLike', type: 'number' },
        { name: 'precipProbability', type: 'number' },
        { name: 'weatherCode', type: 'number' },
        { name: 'windSpeed', type: 'number' },
        { name: 'isDay', type: 'boolean' },
      ],
    },
    { name: 'dayLabel', type: 'string', defaultValue: 'Today' },
  ],
});

Builder.registerComponent(HourlyDetailTable, {
  name: 'Hourly Detail Table',
  inputs: [
    {
      name: 'intervals',
      type: 'list',
      defaultValue: [],
      subFields: [
        { name: 'time', type: 'string' },
        { name: 'temperature', type: 'number' },
        { name: 'feelsLike', type: 'number' },
        { name: 'precipProbability', type: 'number' },
        { name: 'humidity', type: 'number' },
        { name: 'weatherCode', type: 'number' },
        { name: 'windSpeed', type: 'number' },
        { name: 'windDirection', type: 'number' },
        { name: 'uvIndex', type: 'number' },
        { name: 'isDay', type: 'boolean' },
      ],
    },
    { name: 'dayLabel', type: 'string', defaultValue: 'Today' },
  ],
});
