import Pages from './config';
import MuiLayout from '@/layouts/MuiLayout';
import BlankLayout from '@/layouts/BlankLayout';
import LayoutDashboard from '@/layouts/LayoutDashboard';
import MuiDashboardLayout from '@/layouts/MuiDashboardLayout';

type LayoutItem = {
  layout: any;
  routes: string[];
};

const Routers: LayoutItem[] = [
  {
    layout: BlankLayout,
    routes: [Pages.LOGIN.path],
  },
  {
    layout: BlankLayout,
    routes: [Pages.FORGOT_PASSWORD.path],
  },
  {
    layout: MuiLayout,
    routes: [Pages.PROJECTS.path],
  },
  {
    layout: MuiDashboardLayout,
    routes: [Pages.SERVICES.path],
  },
  {
    layout: LayoutDashboard,
    routes: [Pages.WIVI.path],
  },
  {
    layout: LayoutDashboard,
    routes: [Pages.TEAM.path],
  },
  {
    layout: LayoutDashboard,
    routes: [
      Pages.WORKFLOW.path,
      Pages.WORKFLOW_MANAGE.path,
      Pages.WORKFLOW_RUN.path,
    ],
  },
];

export default Routers;
