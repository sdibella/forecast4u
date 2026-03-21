import '@carbon/react/index.scss';
import { withThemeByClassName } from '@storybook/addon-themes';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'padded',
  },
  decorators: [
    withThemeByClassName({
      themes: {
        'White (Light)': '',
        'Gray 10 (Light)': 'cds--g10',
        'Gray 90 (Dark)': 'cds--g90',
        'Gray 100 (Dark)': 'cds--g100',
      },
      defaultTheme: 'White (Light)',
    }),
  ],
};

export default preview;
