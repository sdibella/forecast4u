import { useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Theme } from '@carbon/react';
import { builder } from '@builder.io/react';

// Register components with the Builder.io visual editor
import './components/builder-registry';

// Authenticate with Builder.io Fusion project
builder.init(import.meta.env.VITE_BUILDER_API_KEY);

// Pages
import HomePage from './pages/HomePage';
import WeatherPage from './pages/WeatherPage';
import CatchAllPage from './pages/CatchAllPage';

// Layout
import AppHeader from './components/layout/AppHeader';

// Hooks
import { useTheme } from './hooks/useTheme';
import { useGeolocation } from './hooks/useGeolocation';

// Styles
import './styles/app.scss';

function AppContent() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { location: geoLocation, detecting, detect } = useGeolocation();
  const navigate = useNavigate();

  const handleDetectLocation = useCallback(() => {
    detect();
  }, [detect]);

  // Navigate to detected location when available
  // Using a ref-like pattern to avoid infinite loops
  const handleGeoNavigate = useCallback(() => {
    if (geoLocation?.zip) {
      navigate(`/weather/${geoLocation.zip}`);
    }
  }, [geoLocation, navigate]);

  // Trigger navigation when geoLocation updates
  if (geoLocation?.zip && !detecting) {
    // Small delay to ensure state is settled
    setTimeout(() => handleGeoNavigate(), 0);
  }

  return (
    <Theme theme={theme}>
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--cds-background)',
          color: 'var(--cds-text-primary)',
          transition: 'background 0.3s ease, color 0.3s ease',
        }}
      >
        <AppHeader
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onDetectLocation={handleDetectLocation}
        />
        <main style={{ paddingTop: '3rem' }}>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onDetectLocation={handleDetectLocation}
                  detectingLocation={detecting}
                />
              }
            />
            <Route path="/weather/:zip" element={<WeatherPage />} />
            <Route path="*" element={<CatchAllPage />} />
          </Routes>
        </main>
      </div>
    </Theme>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
