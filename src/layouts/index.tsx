import {useRouter} from 'next/router';
import Routers from '@/router';
import LayoutDashboard from './LayoutDashboard';

const Layout = ({children}: any) => {
  const router = useRouter();

  const layoutConfig = Routers.find(layout =>
    layout.routes.find(route => router.pathname === route)
  );
  const LayoutWrapper = layoutConfig?.layout || LayoutDashboard;

  return <LayoutWrapper>{children}</LayoutWrapper>;
};

export default Layout;
