import { type ReactElement } from 'react';
import LayoutDashboard from '@/widgets/layout/LayoutDashboard';

const Page = (): ReactElement => {
  return <>this is run page</>;
};

export default Page;

/**
 * Layout wrapper
 */
Page.getLayout = (page: ReactElement) => {
  return <LayoutDashboard active="Workflow">{page}</LayoutDashboard>;
};
