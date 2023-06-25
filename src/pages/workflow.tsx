import LayoutDashboard from "@/widgets/LayoutDashboard";
import { ReactElement } from "react";

const Page = () => {
  return <>Workflow</>;
};

export default Page;

/**
 * Layout wrapper
 */
Page.getLayout = (page: ReactElement) => {
  return <LayoutDashboard active="Workflow">{page}</LayoutDashboard>;
};
