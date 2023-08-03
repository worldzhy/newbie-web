import {ReactElement, useEffect, useState} from 'react';
import {Button} from '@mui/material';
import Workflow, {WorkflowItem} from '@/shared/libs/workflow';
import EditModal from '@/widgets/workflow/EditModal';
import WorkflowTable from '@/widgets/workflow/WorkflowTable';
import LayoutDashboard from '@/widgets/layout/LayoutDashboard';

import styles from './index.module.scss';

const Page = (): ReactElement => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<WorkflowItem[]>([]);
  const workflowService = new Workflow();

  const getAllWorkflows = async () => {
    const data = await workflowService.getWorkflows();
    setRows(
      data.map(({id, name, description}) => ({
        id,
        name,
        description,
        Actions: [],
      }))
    );
  };

  useEffect(() => {
    getAllWorkflows();
  }, []);

  return (
    <>
      <div className={styles.addContainer}>
        <Button size="small" variant="contained" onClick={() => setOpen(true)}>
          New Workflow
        </Button>
      </div>
      <WorkflowTable rows={rows} refreshData={getAllWorkflows} />
      <EditModal
        type="workflow"
        open={open}
        setOpen={setOpen}
        refreshData={getAllWorkflows}
      />
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
