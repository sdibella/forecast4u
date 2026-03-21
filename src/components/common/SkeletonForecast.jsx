import {
  Grid,
  Column,
  SkeletonText,
  SkeletonPlaceholder,
  Tile,
} from '@carbon/react';

/**
 * Skeleton loading state for the forecast page.
 * Shows shimmer placeholders while data loads.
 */
export default function SkeletonForecast() {
  return (
    <div style={{ padding: '2rem 0' }}>
      {/* Current conditions skeleton */}
      <Tile style={{ marginBottom: '2rem', padding: '1.5rem' }}>
        <Grid>
          <Column lg={8} md={4} sm={4}>
            <SkeletonText heading width="60%" />
            <SkeletonText paragraph lineCount={2} width="80%" />
          </Column>
          <Column lg={8} md={4} sm={4}>
            <SkeletonPlaceholder style={{ width: '100%', height: '120px' }} />
          </Column>
        </Grid>
      </Tile>

      {/* Daily forecast skeletons */}
      <SkeletonText heading width="30%" style={{ marginBottom: '1rem' }} />
      <Grid>
        {Array.from({ length: 5 }).map((_, i) => (
          <Column key={i} lg={3} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <Tile style={{ padding: '1rem' }}>
              <SkeletonText heading width="50%" />
              <SkeletonPlaceholder style={{ width: '48px', height: '48px', margin: '0.5rem 0' }} />
              <SkeletonText paragraph lineCount={3} width="90%" />
            </Tile>
          </Column>
        ))}
      </Grid>

      {/* Hourly chart skeleton */}
      <Tile style={{ marginTop: '2rem', padding: '1.5rem' }}>
        <SkeletonText heading width="40%" />
        <SkeletonPlaceholder style={{ width: '100%', height: '250px', marginTop: '1rem' }} />
      </Tile>
    </div>
  );
}
