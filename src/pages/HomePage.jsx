import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Column,
  Tile,
  Search,
  Button,
  Tag,
  ClickableTile,
} from '@carbon/react';
import { ArrowRight, Location, TrashCan, RecentlyViewed } from '@carbon/react/icons';
import { useSavedLocations } from '../hooks/useSavedLocations';

const POPULAR_LOCATIONS = [
  { zip: '10001', name: 'New York', state: 'NY' },
  { zip: '90210', name: 'Beverly Hills', state: 'CA' },
  { zip: '60601', name: 'Chicago', state: 'IL' },
  { zip: '33101', name: 'Miami', state: 'FL' },
  { zip: '98101', name: 'Seattle', state: 'WA' },
  { zip: '80202', name: 'Denver', state: 'CO' },
];

/**
 * Landing page with ZIP code search, geolocation, and saved locations.
 */
export default function HomePage({ onDetectLocation, detectingLocation }) {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const { locations: savedLocations, removeLocation } = useSavedLocations();

  const handleSearch = (e) => {
    e?.preventDefault();
    const zip = searchValue.trim();
    if (/^\d{5}$/.test(zip)) {
      navigate(`/weather/${zip}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch(e);
  };

  return (
    <div className="container-main" style={{ paddingTop: '4rem' }}>
      {/* Hero section */}
      <Grid>
        <Column lg={{ span: 8, offset: 4 }} md={{ span: 6, offset: 1 }} sm={4}>
          <div className="stagger-1" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 300, marginBottom: '0.75rem' }}>
              Forecast4U
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--cds-text-secondary)', marginBottom: '2rem' }}>
              5-day weather forecast with 3-hour detail
            </p>

            {/* Search bar */}
            <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '400px', margin: '0 auto' }}>
              <div style={{ flex: 1 }}>
                <Search
                  id="zip-search"
                  labelText="Search by ZIP code"
                  placeholder="Enter ZIP code (e.g., 90210)"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  size="lg"
                />
              </div>
              <Button
                renderIcon={ArrowRight}
                iconDescription="Search"
                onClick={handleSearch}
                disabled={!/^\d{5}$/.test(searchValue.trim())}
                size="lg"
              >
                Go
              </Button>
            </div>

            {/* Geolocation button */}
            <div style={{ marginTop: '1rem' }}>
              <Button
                kind="ghost"
                renderIcon={Location}
                onClick={onDetectLocation}
                disabled={detectingLocation}
                size="sm"
              >
                {detectingLocation ? 'Detecting...' : 'Use my location'}
              </Button>
            </div>
          </div>
        </Column>
      </Grid>

      {/* Saved locations */}
      {savedLocations.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RecentlyViewed size={16} /> Recent Locations
          </h3>
          <Grid narrow>
            {savedLocations.map((loc) => (
              <Column key={loc.zip} lg={4} md={4} sm={4} style={{ marginBottom: '0.5rem' }}>
                <ClickableTile
                  className="forecast-card stagger-2"
                  onClick={() => navigate(`/weather/${loc.zip}`)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <div>
                    <span style={{ fontWeight: 500 }}>{loc.name}</span>
                    {loc.state && <span style={{ color: 'var(--cds-text-secondary)' }}>, {loc.state}</span>}
                    <span style={{ color: 'var(--cds-text-secondary)', marginLeft: '0.5rem', fontSize: '0.75rem' }}>
                      {loc.zip}
                    </span>
                  </div>
                  <Button
                    kind="ghost"
                    size="sm"
                    hasIconOnly
                    renderIcon={TrashCan}
                    iconDescription="Remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeLocation(loc.zip);
                    }}
                  />
                </ClickableTile>
              </Column>
            ))}
          </Grid>
        </div>
      )}

      {/* Popular locations */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>
          Popular Locations
        </h3>
        <div className="stagger-3" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {POPULAR_LOCATIONS.map((loc) => (
            <Tag
              key={loc.zip}
              type="cool-gray"
              size="md"
              onClick={() => navigate(`/weather/${loc.zip}`)}
              style={{ cursor: 'pointer' }}
            >
              {loc.name}, {loc.state}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
