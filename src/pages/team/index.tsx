import React, { type ReactElement, type SyntheticEvent } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import styles from './index.module.scss';
import styleConfig from '@/constants/styleConfig';
import LayoutDashboard from '@/widgets/layout/LayoutDashboard';
import TeamMembers from '@/widgets/team/members';
import TeamRoles from '@/widgets/team/roles';
import AboutUsTab from '@/widgets/team/AboutUsTab';

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
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{
              '& .MuiTabs-flexContainer': { gap: 2 },
              '& .MuiTabs-indicator': { display: 'none' },
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
                  sx={{
                    '&.Mui-selected': {
                      color: styleConfig.color.primaryWhiteColor,
                      background: styleConfig.color.primaryBlackColor,
                    },
                  }}
                />
              )
            )}
          </TabList>
        </Box>
        <TabPanel
          value="1"
          sx={{
            border: 2,
            borderColor: styleConfig.color.primaryGrayColor,
            marginTop: 2,
          }}
        >
          <TeamMembers />
        </TabPanel>
        <TabPanel
          value="2"
          sx={{
            border: 2,
            borderColor: styleConfig.color.primaryGrayColor,
            marginTop: 2,
          }}
        >
          <TeamRoles />
        </TabPanel>
        <TabPanel
          value="3"
          sx={{
            border: 2,
            borderColor: styleConfig.color.primaryGrayColor,
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
