import Pages from './config';
import BlankLayout from '@/layouts/BlankLayout';
import LayoutDashboard from '@/layouts/LayoutDashboard';

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
    layout: LayoutDashboard,
    routes: [Pages.PROJECTS.path],
  },
  {
    layout: LayoutDashboard,
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
