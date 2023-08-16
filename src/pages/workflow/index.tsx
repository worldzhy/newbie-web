import {useEffect, useState} from 'react';
import {Button} from '@mui/material';
import {Workflow} from '@prisma/client';
import EditModal from '@/widgets/workflow/EditModal';
import WorkflowService from '@/http/api/workflow';
import WorkflowTable from '@/widgets/workflow/WorkflowTable';

import styles from './index.module.scss';

const Page = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<Workflow[]>([]);

  const getAllWorkflows = async () => {
    const workflows = await WorkflowService.list();
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
