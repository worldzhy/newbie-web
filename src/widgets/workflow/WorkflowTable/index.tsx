import {FC, useState} from 'react';
import {useRouter} from 'next/router';
import {Box, Button, Link, Modal} from '@mui/material';
import {ModalStyle} from '@/constants/styleConfig';
import Workflow, {WorkflowItem} from '@/shared/libs/workflow';
import EditModal from '../EditModal';
import CloseIcon from '@mui/icons-material/Close';
import TableCustom from '@/components/TableCustom';

import styles from './index.module.scss';

type IProps = {
  rows: WorkflowItem[];
  refreshData?: () => void;
};

const headers = ['Workflow', 'Description', 'Actions'];

const Table: FC<IProps> = ({rows, refreshData}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [values, setValues] = useState<any>();
  const workflowService = new Workflow();

  const actionsRender = (index: number) => (
    <>
      <Link
        style={{marginRight: 6}}
        onClick={() => {
          setValues(rows[index]);
          setOpen(true);
        }}
      >
        Edit
      </Link>
      <Link
        style={{marginRight: 6}}
        onClick={() =>
          router.push({
            pathname: '/workflow/manage',
            query: {id: rows[index]?.id},
          })
        }
      >
        Configure
      </Link>
      <Link
        style={{marginRight: 6}}
        onClick={() =>
          router.push({
            pathname: '/workflow/run',
            query: {id: rows[index]?.id},
          })
        }
      >
        Run
      </Link>
      <Link
        onClick={() => {
          setValues(rows[index]);
          setOpenDelete(true);
        }}
      >
        Delete
      </Link>
    </>
  );
  const handleDelete = async () => {
    await workflowService.deleteWorkflow(values.id);
    refreshData && refreshData();
    setOpenDelete(false);
  };

  return (
    <>
      <TableCustom
        rows={rows.map(({id, ...rest}) => rest)}
        headers={headers}
        isLastColActions={true}
        children={actionsRender}
      />
      <EditModal
        type="workflow"
        open={open}
        values={values}
        setOpen={setOpen}
        refreshData={refreshData}
      />
      <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
        <Box sx={ModalStyle}>
          <div className={styles.container}>
            <CloseIcon
              className={styles.close}
              onClick={() => {
                setOpenDelete(false);
              }}
            />
            <h3 style={{marginBottom: 30}}>
              Are you sure you want to delete {values?.name}
            </h3>
            <Button
              size="small"
              variant="outlined"
              className={styles.submit}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Table;
