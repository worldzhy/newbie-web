import React, { type ReactElement, type SyntheticEvent } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import LayoutDashboard from '@/widgets/LayoutDashboard';
import styles from '@/styles/Team.module.css';
import styleConfig from '@/constants/styleConfig';

const Page = (): ReactElement => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: SyntheticEvent, newValue: string): void => {
    setValue(newValue);
  };

  // Panel 1 Data
  const createData = (
    name: string,
    email: string,
    phone: string,
    role: string
  ): { name: string, email: string, phone: string, role: string } => {
    return { name, email, phone, role };
  };

  const rows = [
    createData('hongbin', 'hongbin@inceptionpad.com', '13256484466', 'Developer'),
    createData('xiabin', 'xiabin@inceptionpad.com', '15605437789', 'Developer'),
    createData('joe', 'joe@inceptionpad.com', '18978545785', 'Developer')
  ];

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{
              '& .MuiTabs-flexContainer': { gap: 2 },
              '& .MuiTabs-indicator': { display: 'none' }
            }}
            variant='scrollable'
            scrollButtons="auto"
          >
              {['Members', 'Roles', 'About us'].map((label: string, index: number) => (
                <Tab
                  key={label}
                  className={styles.tabItems}
                  label={label}
                  value={(index + 1).toString()}
                  sx={{
                    '&.Mui-selected': {
                      color: styleConfig.color.primaryWhiteColor,
                      background: styleConfig.color.primaryBlackColor
                    }
                  }}
                />
              ))}
          </TabList>
        </Box>
        <TabPanel
          value="1"
          sx={{ border: 2, borderColor: styleConfig.color.primaryGrayColor, marginTop: 2 }}
        >
          <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: `${styleConfig.color.primaryGrayColor}`,
                    '& td, & th': { border: `2px solid ${styleConfig.color.primaryBlackColor}` },
                    '& th': { color: `${styleConfig.color.primaryWhiteColor}`, fontSize: '14px', fontWeight: '700' }
                  }}
                >
                  <TableCell align='center'>Members</TableCell>
                  <TableCell align='center'>Email</TableCell>
                  <TableCell align='center'>Phone</TableCell>
                  <TableCell align='center'>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      '& td, & th': { border: `2px solid ${styleConfig.color.primaryBlackColor}` },
                      '& th': { color: `${styleConfig.color.primaryGrayColor}`, fontSize: '14px', fontWeight: '400' }
                    }}
                  >
                    <TableCell align='center'>{row.name}</TableCell>
                    <TableCell align='center'>{row.email}</TableCell>
                    <TableCell align='center'>{row.phone}</TableCell>
                    <TableCell align='center'>{row.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel
          value="2"
          sx={{ border: 2, borderColor: styleConfig.color.primaryGrayColor, marginTop: 2 }}
        >
          Item Two
        </TabPanel>
        <TabPanel
          value="3"
          sx={{ border: 2, borderColor: styleConfig.color.primaryGrayColor, marginTop: 2 }}
        >
          Item Three
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
  return <LayoutDashboard active='Team'>{page}</LayoutDashboard>;
};
