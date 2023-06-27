import { ReactElement } from "react";
import LayoutDashboard from "@/widgets/LayoutDashboard";

const Page = () => {
  return <>this is run page</>
}

export default Page;

/**
 * Layout wrapper
 */
Page.getLayout = (page: ReactElement) => {
  return <LayoutDashboard active="Workflow">{page}</LayoutDashboard>;
};