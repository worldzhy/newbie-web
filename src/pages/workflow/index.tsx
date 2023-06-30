import { type ReactElement, useState } from 'react';
import AddModal from '@/widgets/workflow/AddModal';
import ButtonCustom from '@/components/ButtonCustom';
import WorkflowTable from '@/widgets/workflow/WorkflowTable';
import LayoutDashboard from '@/widgets/layout/LayoutDashboard';

const Page = (): ReactElement => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <ButtonCustom
          size="small"
          customColor="light"
          onClick={() => {
            setOpen(true);
          }}
        >
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
