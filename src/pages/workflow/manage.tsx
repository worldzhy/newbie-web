import {SyntheticEvent, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Box, Tab} from '@mui/material';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import {WorkflowRoute, WorkflowState, WorkflowView} from '@prisma/client';
import WorkflowService from '@/http/api/workflow';
import ViewsTable from '@/widgets/workflow/ViewsTable';
import RoutesTable from '@/widgets/workflow/RoutesTable';
import StatesTable from '@/widgets/workflow/StatesTable';
import WorkflowRouteService from '@/http/api/workflow-route';

import styles from './index.module.scss';

enum TabState {
  Views = 'Views',
  States = 'States',
  Routes = 'Routes',
}

const Page = () => {
  const router = useRouter();
  const [value, setValue] = useState(TabState.Views);
  const [data, setData] = useState<{
    views: WorkflowView[];
    states: WorkflowState[];
    routes: (WorkflowRoute & {
      view: WorkflowView;
      state: WorkflowState;
      nextView: WorkflowView;
    })[];
  }>();
  const {id} = router.query;

  const handleChange = (_: SyntheticEvent, newValue: TabState): void => {
    setValue(newValue);
  };

  const getData = async () => {
    if (typeof id !== 'string' || !id) return;
    const workflow = await WorkflowService.get(id);
    const routes = await WorkflowRouteService.list({workflowId: id});

    setData({views: workflow.views, states: workflow.states, routes});
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <Box sx={{width: '100%', typography: 'body1'}}>
      <TabContext value={value}>
        <Box>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs"
            sx={{
              '& .MuiTabs-flexContainer': {gap: 2},
              '& .MuiTabs-indicator': {display: 'none'},
            }}
            variant="scrollable"
            scrollButtons="auto"
          >
            {[TabState.Views, TabState.States, TabState.Routes].map(
              (label: string) => (
                <Tab
                  key={label}
                  className={styles.tabItems}
                  label={label}
                  value={label}
                />
              )
            )}
          </TabList>
        </Box>
        <TabPanel
          value={TabState.Views}
          sx={{
            border: 2,
            marginTop: 2,
          }}
        >
          <ViewsTable rows={data?.views || []} refreshData={getData} />
        </TabPanel>
        <TabPanel
          value={TabState.States}
          sx={{
            border: 2,
            marginTop: 2,
          }}
        >
          <StatesTable rows={data?.states || []} refreshData={getData} />
        </TabPanel>
        <TabPanel
          value={TabState.Routes}
          sx={{
            border: 2,
            marginTop: 2,
          }}
        >
          <RoutesTable data={data} refreshData={getData} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Page;
