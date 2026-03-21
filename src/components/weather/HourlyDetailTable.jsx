import {
  DataTable,
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
      <DataTable rows={rows} headers={headers} isSortable={false} size="lg">
        {({ rows: tableRows, headers: tableHeaders, getTableProps, getHeaderProps, getRowProps }) => (
          <Table {...getTableProps()} style={{ tableLayout: 'auto' }}>
            <TableHead>
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableHeader key={header.key} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRows.map((row) => {
                const originalRow = rows.find((r) => r.id === row.id);
                return (
                  <TableRow key={row.id} {...getRowProps({ row })}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>
                        {cell.info.header === 'temp' ? (
                          <span className={getTempClass(originalRow?._tempValue)} style={{ fontWeight: 600 }}>
                            {cell.value}°
                          </span>
                        ) : (
                          cell.value
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </DataTable>
    </Tile>
  );
}
