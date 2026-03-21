import { useNavigate } from 'react-router-dom';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from '@carbon/react';
import { Sun, Moon, Location } from '@carbon/react/icons';

/**
 * App header with navigation, theme toggle, and geolocation button.
 */
export default function AppHeader({ isDark, onToggleTheme, onDetectLocation }) {
  const navigate = useNavigate();

  return (
    <Header aria-label="Forecast4U">
      <HeaderName
        href="/"
        prefix=""
        onClick={(e) => {
          e.preventDefault();
          navigate('/');
        }}
      >
        Forecast4U
      </HeaderName>
      <HeaderNavigation aria-label="Navigation" />
      <HeaderGlobalBar>
        {onDetectLocation && (
          <HeaderGlobalAction
            aria-label="Detect my location"
            onClick={onDetectLocation}
            tooltipAlignment="end"
          >
            <Location size={20} />
          </HeaderGlobalAction>
        )}
        <HeaderGlobalAction
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={onToggleTheme}
          tooltipAlignment="end"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
}
