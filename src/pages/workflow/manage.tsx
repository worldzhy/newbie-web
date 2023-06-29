import { type ReactElement } from 'react';
import LayoutDashboard from '@/widgets/LayoutDashboard';

const Page = (): ReactElement => {
  return <>this is manage page</>;
};

export default Page;

/**
 * Layout wrapper
 */
Page.getLayout = (page: ReactElement) => {
  return <LayoutDashboard active="Workflow">{page}</LayoutDashboard>;
};
