import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  Breadcrumb,
  BreadcrumbItem,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@carbon/react';
import { Sun, Moon, Location, Search } from '@carbon/react/icons';

export default {
  title: 'Carbon/Navigation',
  tags: ['autodocs'],
};

export const AppHeader = {
  render: () => (
    <Header aria-label="Forecast4U" style={{ position: 'relative' }}>
      <HeaderName href="#" prefix="">
        Forecast4U
      </HeaderName>
      <HeaderNavigation aria-label="Navigation">
        <HeaderMenuItem href="#">Dashboard</HeaderMenuItem>
        <HeaderMenuItem href="#">Saved Locations</HeaderMenuItem>
        <HeaderMenuItem href="#">Settings</HeaderMenuItem>
      </HeaderNavigation>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Search" tooltipAlignment="end">
          <Search size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Detect location" tooltipAlignment="end">
          <Location size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Toggle theme" tooltipAlignment="end">
          <Sun size={20} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  ),
};

export const BreadcrumbNav = {
  render: () => (
    <Breadcrumb noTrailingSlash>
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Weather</BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>Beverly Hills, CA</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const TabNavigation = {
  render: () => (
    <Tabs>
      <TabList aria-label="Forecast views">
        <Tab>Today</Tab>
        <Tab>Tomorrow</Tab>
        <Tab>5-Day</Tab>
        <Tab>Hourly</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Today&apos;s forecast content</TabPanel>
        <TabPanel>Tomorrow&apos;s forecast content</TabPanel>
        <TabPanel>5-day outlook content</TabPanel>
        <TabPanel>Hourly breakdown content</TabPanel>
      </TabPanels>
    </Tabs>
  ),
};
