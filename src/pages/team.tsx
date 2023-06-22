import React, { type ReactElement } from 'react';
import { Typography } from '@mui/material';

import LayoutDashboard from '@/widgets/LayoutDashboard';
import styles from '@/styles/Team.module.css';

const Page = (): React.ReactElement => {
  return (
    <>
      <Typography paragraph>
        Content
      </Typography>
      <Typography paragraph>
        Content
      </Typography>
    </>
  );
};

export default Page;

/**
 * Layout wrapper
 */
Page.getLayout = (page: ReactElement) => {
  return <LayoutDashboard active='Team'>{page}</LayoutDashboard>;
};
