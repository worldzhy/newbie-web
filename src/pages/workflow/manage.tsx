import { ReactElement, SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Tab } from "@mui/material";
import { ViewItem } from "@/shared/libs/workflow-view";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Workflow from "@/shared/libs/workflow";
import styleConfig from "@/constants/styleConfig";
import ViewsTable from "@/widgets/workflow/ViewsTable";
import RoutesTable from "@/widgets/workflow/RoutesTable";
import StatesTable from "@/widgets/workflow/StatesTable";
import LayoutDashboard from "@/widgets/layout/LayoutDashboard";

import styles from "./index.module.scss";

enum TabState {
  Views = "Views",
  States = "States",
  Routes = "Routes",
}

type Data = {
  description: string | null;
  id: string;
  name: string;
  views: ViewItem[];
  states: any[];
  routes: any[];
  createdAt?: string;
  updatedAt?: string;
};

const Page = (): ReactElement => {
  const router = useRouter();
  const [value, setValue] = useState(TabState.Views);
  const [data, setData] = useState<Data>();
  const workflowService = new Workflow();
  const { id } = router.query;

  const handleChange = (_: SyntheticEvent, newValue: TabState): void => {
    setValue(newValue);
  };

  const getData = async () => {
    if (typeof id !== "string" || !id) return;
    const data: Data = await workflowService.getWorkflowData(id);

    data.views = data.views.map(({ id, workflowId, name, description }) => ({
      id,
      workflowId,
      name,
      description,
    }));
    data.states = data.states.map(({ id, workflowId, name, description }) => ({
      id,
      workflowId,
      name,
      description,
    }));
    // TODO: mapper and routes
    setData(data);
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs"
            sx={{
              "& .MuiTabs-flexContainer": { gap: 2 },
              "& .MuiTabs-indicator": { display: "none" },
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
                  sx={{
                    "&.Mui-selected": {
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
          value={TabState.Views}
          sx={{
            border: 2,
            borderColor: styleConfig.color.primaryGrayColor,
            marginTop: 2,
          }}
        >
          <ViewsTable rows={data?.views || []} refreshData={getData} />
        </TabPanel>
        <TabPanel
          value={TabState.States}
          sx={{
            border: 2,
            borderColor: styleConfig.color.primaryGrayColor,
            marginTop: 2,
          }}
        >
          <StatesTable rows={data?.states || []} refreshData={getData} />
        </TabPanel>
        <TabPanel
          value={TabState.Routes}
          sx={{
            border: 2,
            borderColor: styleConfig.color.primaryGrayColor,
            marginTop: 2,
          }}
        >
          <RoutesTable />
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
  return <LayoutDashboard active="Workflow">{page}</LayoutDashboard>;
};
