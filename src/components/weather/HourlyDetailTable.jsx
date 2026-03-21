import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Tile,
} from '@carbon/react';
import { getWeatherInfo, getWeatherEmoji, getTempClass } from '../../utils/weatherCodes';
import { formatTime, windDirectionLabel } from '../../utils/weatherApi';

/**
 * 3-hour interval detail table for a selected day.
 */
export default function HourlyDetailTable({ intervals, dayLabel }) {
  if (!intervals || intervals.length === 0) {
    return null;
  }

  const headers = [
    { key: 'time', header: 'Time' },
    { key: 'conditions', header: 'Conditions' },
    { key: 'temp', header: 'Temp (°F)' },
    { key: 'feelsLike', header: 'Feels Like' },
    { key: 'precip', header: 'Precip %' },
    { key: 'humidity', header: 'Humidity' },
    { key: 'wind', header: 'Wind' },
    { key: 'uv', header: 'UV Index' },
  ];

  const rows = intervals.map((interval, idx) => {
    const weather = getWeatherInfo(interval.weatherCode);
    const emoji = getWeatherEmoji(weather.icon, !interval.isDay);

    return {
      id: String(idx),
      time: formatTime(interval.time),
      conditions: `${emoji} ${weather.description}`,
      temp: interval.temperature,
      feelsLike: `${interval.feelsLike}°`,
      precip: `${interval.precipProbability}%`,
      humidity: `${interval.humidity}%`,
      wind: `${interval.windSpeed} mph ${windDirectionLabel(interval.windDirection)}`,
      uv: interval.uvIndex != null ? interval.uvIndex.toFixed(1) : '-',
      _tempValue: interval.temperature,
    };
  });

  return (
    <Tile style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>
        3-Hour Forecast{dayLabel ? ` — ${dayLabel}` : ''}
      </h3>
      <Table size="lg" style={{ tableLayout: 'auto' }}>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableHeader key={header.key}>{header.header}</TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {headers.map((header) => (
                <TableCell key={`${row.id}-${header.key}`}>
                  {header.key === 'temp' ? (
                    <span className={getTempClass(row._tempValue)} style={{ fontWeight: 600 }}>
                      {row[header.key]}°
                    </span>
                  ) : (
                    row[header.key]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Tile>
  );
}
