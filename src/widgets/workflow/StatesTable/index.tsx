import { FC, useState } from "react";
import { Box, Modal } from "@mui/material";
import { ModalStyle } from "@/constants/styleConfig";
import StatesService, { StateItem } from "@/shared/libs/workflow-state";
import EditModal from "../EditModal";
import CloseIcon from "@mui/icons-material/Close";
import TableCustom from "@/components/TableCustom";
import ButtonCustom from "@/components/ButtonCustom";

import styles from "./index.module.scss";

type IProps = {
  rows: StateItem[];
  refreshData: () => void;
};

const headers = ["Name", "Description", "Actions"];

const Table: FC<IProps> = ({ rows, refreshData }) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [values, setValues] = useState<any>();
  const service = new StatesService();

  const actionsRender = (index: number) => (
    <>
      <ButtonCustom
        customColor="link"
        size="small"
        onClick={() => {
          setValues(rows[index]);
          setOpen(true);
        }}
      >
        Edit
      </ButtonCustom>
      <ButtonCustom
        customColor="link"
        size="small"
        onClick={() => {
          setValues(rows[index]);
          setOpenDelete(true);
        }}
      >
        Delete
      </ButtonCustom>
    </>
  );
  const handleCreate = () => {
    setValues(undefined);
    setOpen(true);
  };
  const handleDelete = async () => {
    await service.deleteState(values.id);
    refreshData();
    setOpenDelete(false);
  };

  return (
    <>
      <div className={styles.addContainer}>
        <ButtonCustom size="small" customColor="dark" onClick={handleCreate}>
          New State
        </ButtonCustom>
      </div>
      <TableCustom
        rows={rows.map(({ id, workflowId, ...rest }) => ({
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
            <h3 style={{ marginBottom: 30 }}>
              Are you sure you want to delete {values?.name}
            </h3>
            <ButtonCustom
              size="small"
              customColor="light"
              className={styles.submit}
              onClick={handleDelete}
            >
              Delete
            </ButtonCustom>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Table;
