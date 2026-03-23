import React from 'react';
import {
  Tile,
  ClickableTile,
  SelectableTile,
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
  Grid,
  Column,
} from '@carbon/react';

export default {
  title: 'Carbon/Tile',
  component: Tile,
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <Tile style={{ maxWidth: '400px' }}>
      <h4 style={{ marginBottom: '0.5rem' }}>Default Tile</h4>
      <p>Tiles are a highly flexible component for displaying information.</p>
    </Tile>
  ),
};

export const Clickable = {
  render: () => (
    <ClickableTile
      href="#"
      onClick={(e) => e.preventDefault()}
      style={{ maxWidth: '400px' }}
    >
      <h4 style={{ marginBottom: '0.5rem' }}>Clickable Tile</h4>
      <p>Click this tile to navigate somewhere.</p>
    </ClickableTile>
  ),
};

export const Selectable = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <SelectableTile id="tile-1" value="option-1">
        Option 1
      </SelectableTile>
      <SelectableTile id="tile-2" value="option-2">
        Option 2
      </SelectableTile>
      <SelectableTile id="tile-3" value="option-3">
        Option 3
      </SelectableTile>
    </div>
  ),
};

export const Expandable = {
  render: () => (
    <ExpandableTile
      tileCollapsedIconText="Expand"
      tileExpandedIconText="Collapse"
      style={{ maxWidth: '400px' }}
    >
      <TileAboveTheFoldContent>
        <h4>Weather Summary</h4>
        <p>72°F - Partly Cloudy</p>
      </TileAboveTheFoldContent>
      <TileBelowTheFoldContent>
        <div style={{ paddingTop: '1rem' }}>
          <p>Humidity: 45%</p>
          <p>Wind: 8 mph NW</p>
          <p>UV Index: 5</p>
          <p>Pressure: 1013 hPa</p>
        </div>
      </TileBelowTheFoldContent>
    </ExpandableTile>
  ),
};

export const TileGrid = {
  render: () => (
    <Grid>
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
        <Column key={day} lg={3} md={4} sm={4} style={{ marginBottom: '1rem' }}>
          <Tile style={{ textAlign: 'center', padding: '1.5rem' }}>
            <h4>{day}</h4>
            <p style={{ fontSize: '2rem', margin: '0.5rem 0' }}>72°</p>
            <p style={{ color: '#525252', fontSize: '0.875rem' }}>Partly Cloudy</p>
          </Tile>
        </Column>
      ))}
    </Grid>
  ),
};
