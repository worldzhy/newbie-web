import {ReactElement, useEffect, useState} from 'react';
import {Button} from '@mui/material';
import EditModal from '@/widgets/workflow/EditModal';
import WorkflowTable from '@/widgets/workflow/WorkflowTable';
import {Workflow} from '@prisma/client';
import WorkflowApiRequest from '@/http/api/workflow';

import styles from './index.module.scss';

const Page = (): ReactElement => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<Workflow[]>([]);
  const workflowService = new WorkflowApiRequest();

  const getAllWorkflows = async () => {
    const workflows = await workflowService.list();
    setRows(workflows);
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
