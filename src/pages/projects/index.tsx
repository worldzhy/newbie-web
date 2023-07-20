import React, {type ReactElement} from 'react';
import LayoutDashboard from '@/widgets/layout/LayoutDashboard';
import {Typography} from '@mui/material';

const Page = (): ReactElement => {
  return <Typography variant="h1">Projects</Typography>;
};

export default Page;

/**
 * Layout wrapper
 */
Page.getLayout = (page: ReactElement) => {
  return <LayoutDashboard active="Projects">{page}</LayoutDashboard>;
};
