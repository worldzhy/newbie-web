import { ReactElement, useState } from "react";
import AddModal from "./components/AddModal";
import WorkflowTable from "./components/WorkflowTable";
import LayoutDashboard from "@/widgets/LayoutDashboard";
import ButtonCustom from "@/components/ButtonCustom/ButtonCustom";

const Page = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <div style={{marginBottom: 10}}>
        <ButtonCustom
          size="small"
          customColor="light"
          onClick={() => setOpen(true)}>
            Add Workflow
        </ButtonCustom>
      </div>
      <WorkflowTable />
      <AddModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Page;

/**
 * Layout wrapper
 */
Page.getLayout = (page: ReactElement) => {
  return <LayoutDashboard active="Workflow">{page}</LayoutDashboard>;
};
