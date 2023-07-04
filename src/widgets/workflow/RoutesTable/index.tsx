import { FC, useEffect, useState } from "react";
import {
  Box,
  Modal,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
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
    id: "1",
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
    id: "2",
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
  const [openStartPoint, setOpenStartPoint] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [values, setValues] = useState<any>();
  const [startPointId, setStartPointId] = useState("");

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
  const handleUpdateStartPoint = () => {
    // TODO: handle update start point
  };

  useEffect(() => {
    setStartPointId(rows.find(({ startPoint }) => startPoint)?.id || "");
  }, [rows]);

  return (
    <>
      <div className={styles.addContainer}>
        <ButtonCustom
          size="small"
          customColor="light"
          onClick={() => setOpenStartPoint(true)}
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
        rows={rows.map(({ startPoint, view, state, nextView, actions }) => ({
          view: startPoint ? `(*) ${view}` : view,
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
              onClick={() => setOpenDelete(false)}
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
      <Modal open={openStartPoint} onClose={() => setOpenStartPoint(false)}>
        <Box sx={ModalStyle}>
          <div className={styles.container}>
            <CloseIcon
              className={styles.close}
              onClick={() => setOpenStartPoint(false)}
            />
            <h3 style={{ marginBottom: 30 }}>Choice Start Point</h3>
            <FormControl style={{ marginBottom: 20 }}>
              <InputLabel htmlFor="startPoint">Start Point</InputLabel>
              <Select
                id="startPoint"
                labelId="startPoint"
                value={startPointId}
                label="Start Point"
                onChange={(e) => setStartPointId(e.target.value)}
              >
                {rows.map(({ id, view }) => (
                  <MenuItem value={id} key={id}>
                    {view}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <ButtonCustom
              size="small"
              customColor="light"
              className={styles.submit}
              onClick={handleUpdateStartPoint}
            >
              Update
            </ButtonCustom>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Table;
