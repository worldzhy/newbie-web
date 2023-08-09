import {FC, useState} from 'react';
import {ModalStyle} from '@/constants/styleConfig';
import {Box, Button, Link, Modal} from '@mui/material';
import EditModal from '../EditModal';
import ComponentModal from '../ComponentModal';
import CloseIcon from '@mui/icons-material/Close';
import TableCustom from '@/components/TableCustom';
import {WorkflowView} from '@prisma/client';
import WorkflowViewApiRequest from '@/shared/libs/workflow-view';

import styles from './index.module.scss';

type IProps = {
  rows: WorkflowView[];
  refreshData: () => void;
};

const headers = ['Name', 'Description', 'Actions'];

const Table: FC<IProps> = ({rows, refreshData}) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openComponent, setOpenComponent] = useState(false);
  const [values, setValues] = useState<any>();
  const service = new WorkflowViewApiRequest();

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
        onClick={() => {
          setValues(rows[index]);
          setOpenComponent(true);
        }}
      >
        Components
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
          New View
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
        type="view"
        open={open}
        setOpen={setOpen}
        values={values}
        refreshData={refreshData}
      />
      <ComponentModal
        open={openComponent}
        setOpen={setOpenComponent}
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
