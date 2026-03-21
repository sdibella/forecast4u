import { Tile } from '@carbon/react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { formatTime } from '../../utils/weatherApi';

/**
 * Interactive temperature + precipitation chart for a day's forecast.
 */
export default function ForecastChart({ intervals, dayLabel }) {
  if (!intervals || intervals.length === 0) return null;

  const chartData = intervals.map((interval) => ({
    time: formatTime(interval.time),
    temperature: interval.temperature,
    feelsLike: interval.feelsLike,
    precipitation: interval.precipProbability,
    humidity: interval.humidity,
    windSpeed: interval.windSpeed,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;

    return (
      <div
        style={{
          background: 'var(--cds-layer)',
          border: '1px solid var(--cds-border-subtle)',
          padding: '0.75rem',
          borderRadius: '4px',
          fontSize: '0.75rem',
        }}
      >
        <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{label}</p>
        {payload.map((entry, i) => (
          <p key={i} style={{ color: entry.color, marginBottom: '0.125rem' }}>
            {entry.name}: {entry.value}{entry.name.includes('Temp') || entry.name === 'Feels Like' ? '°F' : '%'}
          </p>
        ))}
      </div>
    );
  };

  return (
    <Tile style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>
        Temperature & Precipitation{dayLabel ? ` — ${dayLabel}` : ''}
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--cds-border-subtle)" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 12, fill: 'var(--cds-text-secondary)' }}
            axisLine={{ stroke: 'var(--cds-border-subtle)' }}
          />
          <YAxis
            yAxisId="temp"
            tick={{ fontSize: 12, fill: 'var(--cds-text-secondary)' }}
            axisLine={{ stroke: 'var(--cds-border-subtle)' }}
            label={{ value: '°F', position: 'insideTopLeft', style: { fontSize: 11, fill: 'var(--cds-text-secondary)' } }}
          />
          <YAxis
            yAxisId="precip"
            orientation="right"
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: 'var(--cds-text-secondary)' }}
            axisLine={{ stroke: 'var(--cds-border-subtle)' }}
            label={{ value: '%', position: 'insideTopRight', style: { fontSize: 11, fill: 'var(--cds-text-secondary)' } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '0.75rem' }} />
          <Area
            yAxisId="temp"
            type="monotone"
            dataKey="temperature"
            name="Temp"
            stroke="#0043ce"
            fill="#0043ce"
            fillOpacity={0.1}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Area
            yAxisId="temp"
            type="monotone"
            dataKey="feelsLike"
            name="Feels Like"
            stroke="#8a3ffc"
            fill="none"
            strokeWidth={1.5}
            strokeDasharray="5 5"
            dot={false}
          />
          <Bar
            yAxisId="precip"
            dataKey="precipitation"
            name="Precip %"
            fill="#0072c3"
            fillOpacity={0.4}
            barSize={20}
            radius={[3, 3, 0, 0]}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Tile>
  );
}
