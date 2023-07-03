import { FC, useState } from "react";
import { Box, Modal } from "@mui/material";
import { ModalStyle } from "@/constants/styleConfig";
import RouteModal from "../RouteModal";
import CloseIcon from "@mui/icons-material/Close";
import TableCustom from "@/components/TableCustom";
import ButtonCustom from "@/components/ButtonCustom";

import styles from "./index.module.scss";

const headers = ["View", "State", "Next View", "Actions"];

// TODO: remove mock data
const rows = [
  {
    id: 1,
    startPoint: true,
    view: "view 1",
    viewId: "1",
    state: "state 1",
    stateId: "1",
    nextView: "next view 1",
    nextViewId: "1",
    actions: [],
  },
  {
    id: 2,
    startPoint: false,
    viewId: "2",
    view: "view 2",
    stateId: "2",
    state: "state 2",
    nextView: "next view 2",
    nextViewId: "2",
    actions: [],
  },
];

const Table: FC = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [values, setValues] = useState<any>();

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
  const handleDelete = () => {
    // TODO: handle delete
  };

  return (
    <>
      <div className={styles.addContainer}>
        {/* TODO: check if we need this button */}
        <ButtonCustom
          size="small"
          customColor="light"
          onClick={() => {}}
          style={{ marginRight: 20 }}
        >
          Set Starting Point
        </ButtonCustom>
        <ButtonCustom
          size="small"
          customColor="dark"
          onClick={() => setOpen(true)}
        >
          New Route
        </ButtonCustom>
      </div>
      <TableCustom
        rows={rows.map(({ view, state, nextView, actions }) => ({
          view,
          state,
          nextView,
          actions,
        }))}
        headers={headers}
        isLastColActions={true}
        children={actionsRender}
      />
      <RouteModal open={open} setOpen={setOpen} values={values} />
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
              Are you sure you want to delete {values?.view}
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
