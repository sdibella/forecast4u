import React from 'react';
import WeatherAlertBanner from './WeatherAlertBanner';

export default {
  title: 'Forecast4U/WeatherAlertBanner',
  component: WeatherAlertBanner,
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'select',
      options: ['extreme', 'severe', 'moderate', 'minor'],
    },
    dismissible: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A custom weather alert banner built on IBM Carbon primitives. Displays severe weather warnings, advisories, and watches with expandable details, severity tagging, and dismiss functionality. Designed to be reskinned for production use.',
      },
    },
  },
};

export const Extreme = {
  args: {
    severity: 'extreme',
    type: 'Tornado Warning',
    headline: 'Tornado warning in effect for your area until 6:00 PM CDT',
    description:
      'The National Weather Service has issued a tornado warning for the following areas. Take shelter immediately in an interior room on the lowest floor of a sturdy building. Avoid windows. If caught outdoors, move to the closest substantial shelter and protect yourself from flying debris.',
    issuedAt: 'March 21, 2026 3:15 PM CDT',
    expiresAt: 'March 21, 2026 6:00 PM CDT',
    affectedAreas: ['Cook County', 'DuPage County', 'Will County'],
  },
};

export const Severe = {
  args: {
    severity: 'severe',
    type: 'Thunderstorm Warning',
    headline: 'Severe thunderstorm warning with potential for large hail and damaging winds',
    description:
      'A severe thunderstorm capable of producing quarter-sized hail and wind gusts up to 70 mph is moving through the area. Seek shelter in a sturdy building and move away from windows.',
    issuedAt: 'March 21, 2026 2:00 PM CDT',
    expiresAt: 'March 21, 2026 4:30 PM CDT',
    affectedAreas: ['Downtown', 'North Side', 'Lincoln Park'],
  },
};

export const Moderate = {
  args: {
    severity: 'moderate',
    type: 'Heat Advisory',
    headline: 'Heat advisory in effect from noon today through 8 PM Saturday',
    description:
      'Heat index values up to 108°F expected. The combination of hot temperatures and high humidity will create a dangerous situation. Drink plenty of fluids, stay in air-conditioned rooms, and check on relatives and neighbors.',
    issuedAt: 'March 21, 2026 10:00 AM CDT',
    expiresAt: 'March 22, 2026 8:00 PM CDT',
    affectedAreas: ['Metro Area', 'Suburbs'],
  },
};

export const Minor = {
  args: {
    severity: 'minor',
    type: 'Frost Advisory',
    headline: 'Frost advisory in effect from midnight to 9 AM tomorrow',
    description:
      'Sub-freezing temperatures as low as 28°F expected. Cover sensitive plants and bring pets indoors. Consider allowing faucets to drip slowly to prevent pipe freezing.',
    issuedAt: 'March 21, 2026 4:00 PM CDT',
    expiresAt: 'March 22, 2026 9:00 AM CDT',
    affectedAreas: ['Northern Suburbs', 'Rural Areas'],
  },
};

export const NotDismissible = {
  args: {
    severity: 'extreme',
    type: 'Hurricane Warning',
    headline: 'Category 3 hurricane expected to make landfall within 24 hours',
    description: 'This alert cannot be dismissed due to its severity.',
    dismissible: false,
    affectedAreas: ['Coastal Areas', 'Low-lying Regions', 'Flood Zones'],
  },
};

export const MultipleAlerts = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <WeatherAlertBanner
        severity="severe"
        type="Thunderstorm Warning"
        headline="Severe thunderstorms expected this afternoon"
        description="Strong storms with hail and gusty winds possible."
        issuedAt="March 21, 2026 11:00 AM"
        expiresAt="March 21, 2026 7:00 PM"
        affectedAreas={['Metro Area']}
      />
      <WeatherAlertBanner
        severity="moderate"
        type="Flood Watch"
        headline="Flood watch in effect through Saturday evening"
        description="Heavy rainfall may lead to flash flooding in low-lying areas."
        issuedAt="March 21, 2026 6:00 AM"
        expiresAt="March 22, 2026 10:00 PM"
        affectedAreas={['River Valleys', 'Urban Areas']}
      />
      <WeatherAlertBanner
        severity="minor"
        type="Wind Advisory"
        headline="Gusty winds up to 45 mph expected tonight"
        description="Secure loose outdoor objects."
        issuedAt="March 21, 2026 12:00 PM"
        expiresAt="March 22, 2026 6:00 AM"
      />
    </div>
  ),
};
