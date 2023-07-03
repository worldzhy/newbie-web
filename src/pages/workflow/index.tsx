import { ReactElement, useState } from "react";
import EditModal from "@/widgets/workflow/EditModal";
import ButtonCustom from "@/components/ButtonCustom";
import WorkflowTable from "@/widgets/workflow/WorkflowTable";
import LayoutDashboard from "@/widgets/layout/LayoutDashboard";

import styles from "./index.module.scss";

const Page = (): ReactElement => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.addContainer}>
        <ButtonCustom
          size="small"
          customColor="light"
          onClick={() => setOpen(true)}
        >
          New Workflow
        </ButtonCustom>
      </div>
      <WorkflowTable />
      <EditModal open={open} setOpen={setOpen} />
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
