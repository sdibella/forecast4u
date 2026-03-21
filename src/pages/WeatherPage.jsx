import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Grid,
  Column,
  Button,
  InlineNotification,
  Breadcrumb,
  BreadcrumbItem,
} from '@carbon/react';
import { ArrowLeft } from '@carbon/react/icons';
import { BuilderComponent, builder } from '@builder.io/react';
import { useWeather } from '../hooks/useWeather';
import { useSavedLocations } from '../hooks/useSavedLocations';
import CurrentConditions from '../components/weather/CurrentConditions';
import DailyForecastCard from '../components/weather/DailyForecastCard';
import HourlyDetailTable from '../components/weather/HourlyDetailTable';
import ForecastChart from '../components/weather/ForecastChart';
import SkeletonForecast from '../components/common/SkeletonForecast';
import { formatDate } from '../utils/weatherApi';

/**
 * Main weather forecast page.
 * Route: /weather/:zip
 */
export default function WeatherPage() {
  const { zip } = useParams();
  const navigate = useNavigate();
  const { data, location, loading, error } = useWeather(zip);
  const { addLocation } = useSavedLocations();
  const [selectedDay, setSelectedDay] = useState(0);
  const [builderContent, setBuilderContent] = useState(null);

  // Save location when loaded
  useEffect(() => {
    if (location?.name) {
      addLocation(zip, location.name, location.state);
    }
  }, [location, zip, addLocation]);

  // Fetch Builder.io content for this page model
  useEffect(() => {
    builder
      .get('weather-page', { url: `/weather/${zip}` })
      .promise()
      .then(setBuilderContent)
      .catch(() => setBuilderContent(null));
  }, [zip]);

  if (error) {
    return (
      <div className="container-main" style={{ paddingTop: '2rem' }}>
        <Button kind="ghost" renderIcon={ArrowLeft} onClick={() => navigate('/')} style={{ marginBottom: '1rem' }}>
          Back to search
        </Button>
        <InlineNotification
          kind="error"
          title="Error loading forecast"
          subtitle={error}
          hideCloseButton
        />
      </div>
    );
  }

  return (
    <div className="container-main" style={{ paddingTop: '1.5rem' }}>
      {/* Navigation */}
      <Breadcrumb noTrailingSlash style={{ marginBottom: '1rem' }}>
        <BreadcrumbItem href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          Home
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          {loading ? `ZIP ${zip}` : `${location?.name || zip}${location?.state ? `, ${location.state}` : ''}`}
        </BreadcrumbItem>
      </Breadcrumb>

      {loading ? (
        <SkeletonForecast />
      ) : (
        <div className="page-enter page-enter-active">
          {/* Current conditions (staggered animated) */}
          <div className="stagger-1">
            <CurrentConditions
              current={data.current}
              locationName={location?.name || zip}
              locationState={location?.state}
            />
          </div>

          {/* 5-day forecast cards */}
          <div className="stagger-2">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
              5-Day Forecast
            </h2>
          </div>
          <Grid narrow>
            {data.forecastByDay.map((day, idx) => (
              <Column key={day.date} lg={3} md={4} sm={4} style={{ marginBottom: '1rem' }} className={`stagger-${Math.min((idx % 5) + 1, 5)}`}>
                <DailyForecastCard
                  day={day}
                  isSelected={idx === selectedDay}
                  onClick={() => setSelectedDay(idx)}
                />
              </Column>
            ))}
          </Grid>

          {/* Interactive chart for selected day */}
          {data.forecastByDay[selectedDay] && (
            <div className="stagger-4" style={{ marginTop: '1.5rem' }}>
              <ForecastChart
                intervals={data.forecastByDay[selectedDay].intervals}
                dayLabel={formatDate(data.forecastByDay[selectedDay].date)}
              />
            </div>
          )}

          {/* 3-hour detail table for selected day */}
          {data.forecastByDay[selectedDay] && (
            <div className="stagger-5">
              <HourlyDetailTable
                intervals={data.forecastByDay[selectedDay].intervals}
                dayLabel={formatDate(data.forecastByDay[selectedDay].date)}
              />
            </div>
          )}

          {/* Builder.io managed content (if any) */}
          {builderContent && (
            <div style={{ marginTop: '2rem' }}>
              <BuilderComponent model="weather-page" content={builderContent} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
