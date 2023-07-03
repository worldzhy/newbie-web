import { ReactElement, SyntheticEvent, useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import styleConfig from "@/constants/styleConfig";
import ViewsTable from "@/widgets/workflow/ViewsTable";
import StatesTable from "@/widgets/workflow/StatesTable";
import RoutesTable from "@/widgets/workflow/RoutesTable";
import LayoutDashboard from "@/widgets/layout/LayoutDashboard";

import styles from "./index.module.scss";

const Page = (): ReactElement => {
  /**
   * States
   */
  const [value, setValue] = useState("1");

  /**
   * Handlers
   */
  const handleChange = (event: SyntheticEvent, newValue: string): void => {
    setValue(newValue);
  };

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
            {["Views", "States", "Routes"].map(
              (label: string, index: number) => (
                <Tab
                  key={label}
                  className={styles.tabItems}
                  label={label}
                  value={(index + 1).toString()}
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
          value="1"
          sx={{
            border: 2,
            borderColor: styleConfig.color.primaryGrayColor,
            marginTop: 2,
          }}
        >
          <ViewsTable />
        </TabPanel>
        <TabPanel
          value="2"
          sx={{
            border: 2,
            borderColor: styleConfig.color.primaryGrayColor,
            marginTop: 2,
          }}
        >
          <StatesTable />
        </TabPanel>
        <TabPanel
          value="3"
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
