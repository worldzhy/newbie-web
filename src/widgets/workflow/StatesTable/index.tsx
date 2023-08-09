import {FC, useState} from 'react';
import {Box, Button, Link, Modal} from '@mui/material';
import {ModalStyle} from '@/constants/styleConfig';
import EditModal from '../EditModal';
import CloseIcon from '@mui/icons-material/Close';
import TableCustom from '@/components/TableCustom';
import {WorkflowState} from '@prisma/client';
import WorkflowStateApiRequest from '@/shared/libs/workflow-state';

import styles from './index.module.scss';

type IProps = {
  rows: WorkflowState[];
  refreshData: () => void;
};

const headers = ['Name', 'Description', 'Actions'];

const Table: FC<IProps> = ({rows, refreshData}) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [values, setValues] = useState<any>();
  const service = new WorkflowStateApiRequest();

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
        onClick={() => {
          setValues(rows[index]);
          setOpenDelete(true);
        }}
      >
        Delete
      </Link>
    </>
  );
  const handleCreate = () => {
    setValues(undefined);
    setOpen(true);
  };
  const handleDelete = async () => {
    await service.delete(values.id);
    refreshData();
    setOpenDelete(false);
  };

  return (
    <>
      <div className={styles.addContainer}>
        <Button size="small" variant="contained" onClick={handleCreate}>
          New State
        </Button>
      </div>
      <TableCustom
        rows={rows.map(({id, workflowId, ...rest}) => ({
          ...rest,
          Actions: [],
        }))}
        headers={headers}
        isLastColActions={true}
        children={actionsRender}
      />
      <EditModal
        type="state"
        open={open}
        setOpen={setOpen}
        values={values}
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
