import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Tag,
} from '@carbon/react';

export default {
  title: 'Carbon/DataTable',
  component: DataTable,
  tags: ['autodocs'],
};

const forecastHeaders = [
  { key: 'time', header: 'Time' },
  { key: 'condition', header: 'Condition' },
  { key: 'temp', header: 'Temp (°F)' },
  { key: 'humidity', header: 'Humidity' },
  { key: 'wind', header: 'Wind' },
  { key: 'precip', header: 'Precip %' },
];

const forecastRows = [
  { id: '1', time: '12 AM', condition: 'Clear', temp: '58', humidity: '65%', wind: '5 mph N', precip: '0%' },
  { id: '2', time: '3 AM', condition: 'Clear', temp: '55', humidity: '70%', wind: '3 mph NE', precip: '0%' },
  { id: '3', time: '6 AM', condition: 'Partly Cloudy', temp: '54', humidity: '72%', wind: '4 mph E', precip: '5%' },
  { id: '4', time: '9 AM', condition: 'Partly Cloudy', temp: '60', humidity: '60%', wind: '6 mph SE', precip: '10%' },
  { id: '5', time: '12 PM', condition: 'Mostly Sunny', temp: '68', humidity: '50%', wind: '8 mph S', precip: '5%' },
  { id: '6', time: '3 PM', condition: 'Sunny', temp: '72', humidity: '45%', wind: '10 mph SW', precip: '0%' },
  { id: '7', time: '6 PM', condition: 'Partly Cloudy', temp: '67', humidity: '55%', wind: '7 mph W', precip: '10%' },
  { id: '8', time: '9 PM', condition: 'Clear', temp: '62', humidity: '60%', wind: '5 mph NW', precip: '0%' },
];

export const ForecastTable = {
  render: () => (
    <DataTable rows={forecastRows} headers={forecastHeaders} isSortable>
      {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
        <TableContainer title="3-Hour Forecast" description="Beverly Hills, CA — March 21, 2026">
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader key={header.key} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} {...getRowProps({ row })}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  ),
};

export const WithToolbar = {
  render: () => (
    <DataTable rows={forecastRows} headers={forecastHeaders} isSortable>
      {({ rows, headers, getTableProps, getHeaderProps, getRowProps, onInputChange }) => (
        <TableContainer title="Searchable Forecast">
          <TableToolbar>
            <TableToolbarContent>
              <TableToolbarSearch onChange={onInputChange} placeholder="Filter forecast..." />
            </TableToolbarContent>
          </TableToolbar>
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader key={header.key} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} {...getRowProps({ row })}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  ),
};
