import React, {type ReactElement, type SyntheticEvent} from 'react';
import {Box, Tab} from '@mui/material';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import MembersTab from '@/widgets/team/MembersTab';
import RolesTab from '@/widgets/team/RolesTab';
import AboutUsTab from '@/widgets/team/AboutUsTab';
import LayoutDashboard from '@/widgets/layout/LayoutDashboard';
import styles from './index.module.scss';

const Page = (): ReactElement => {
  /**
   * States
   */
  const [value, setValue] = React.useState('1');

  /**
   * Handlers
   */
  const handleChange = (event: SyntheticEvent, newValue: string): void => {
    setValue(newValue);
  };

  return (
    <Box sx={{width: '100%', typography: 'body1'}}>
      <TabContext value={value}>
        <Box>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{
              '& .MuiTabs-flexContainer': {gap: 2},
              '& .MuiTabs-indicator': {display: 'none'},
            }}
            variant="scrollable"
            scrollButtons="auto"
          >
            {['Members', 'Roles', 'About us'].map(
              (label: string, index: number) => (
                <Tab
                  key={label}
                  className={styles.tabItems}
                  label={label}
                  value={(index + 1).toString()}
                />
              )
            )}
          </TabList>
        </Box>
        <TabPanel
          value="1"
          sx={{
            border: 2,
            marginTop: 2,
          }}
        >
          <MembersTab />
        </TabPanel>
        <TabPanel
          value="2"
          sx={{
            border: 2,
            marginTop: 2,
          }}
        >
          <RolesTab />
        </TabPanel>
        <TabPanel
          value="3"
          sx={{
            border: 2,
            marginTop: 2,
          }}
        >
          <AboutUsTab />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Page;

/**
 * Layout wrapper
 */
Page.getLayout = (page: ReactElement) => {
  return <LayoutDashboard active="Team">{page}</LayoutDashboard>;
};
