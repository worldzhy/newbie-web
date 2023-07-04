import { FC, useState, useEffect } from "react";
import {
  Box,
  Modal,
  Switch,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { ModalStyle } from "@/constants/styleConfig";
import CloseIcon from "@mui/icons-material/Close";
import ButtonCustom from "@/components/ButtonCustom";

import styles from "./index.module.scss";

const states = [
  { id: 1, name: "State 1", desc: "Description 1", Actions: [] },
  { id: 2, name: "State 2", desc: "Description 2", Actions: [] },
];
const views = [
  { id: 1, name: "View 1", desc: "Description 1", Actions: [] },
  { id: 2, name: "View 2", desc: "Description 2", Actions: [] },
];

interface IProps {
  open: boolean;
  values?: Record<string, string>;
  setOpen: (open: boolean) => void;
}

const defaultValues = {
  id: undefined,
  startPoint: false,
  viewId: "",
  stateId: "",
  nextViewId: "",
};

const RouteModal: FC<IProps> = ({ open, setOpen, values = defaultValues }) => {
  const {
    id,
    startPoint: initStartPoint,
    viewId: initView,
    stateId: initState,
    nextViewId: initNextView,
  } = values;
  const [formValues, setFormValues] = useState<any>(defaultValues);
  const { startPoint, viewId, stateId, nextViewId } = formValues;

  const handleChange = (event: any) => {
    const { name, value, checked } = event.target;
    setFormValues({
      ...formValues,
      [name]: name === "startPoint" ? checked : value,
    });
  };
  const handleUpdate = (): void => {
    console.log(
      startPoint,
      viewId,
      stateId,
      nextViewId,
      "----> startPoint, view, state, nextView"
    );
    if (id) {
      // TODO: do update
    } else {
      // TODO: do add
    }
    setFormValues(defaultValues);
    setOpen(false);
  };

  useEffect(() => {
    setFormValues({
      startPoint: initStartPoint,
      viewId: initView,
      stateId: initState,
      nextViewId: initNextView,
    });
  }, [initStartPoint, initView, initState, initNextView]);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={ModalStyle}>
        <div className={styles.container}>
          <CloseIcon className={styles.close} onClick={() => setOpen(false)} />
          <h3 style={{ marginBottom: 30 }}>{!id ? "New" : "Edit"} Route</h3>
          <FormControlLabel
            label="Start Point"
            name="startPoint"
            control={<Switch checked={startPoint} onChange={handleChange} />}
            style={{ marginBottom: 30 }}
          />
          <FormControl style={{ marginBottom: 20 }}>
            <InputLabel htmlFor="view">View</InputLabel>
            <Select
              id="view"
              labelId="view"
              name="viewId"
              value={viewId}
              label="View"
              onChange={handleChange}
            >
              {views.map(({ id, name }) => (
                <MenuItem value={id} key={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl style={{ marginBottom: 20 }}>
            <InputLabel htmlFor="state">State</InputLabel>
            <Select
              id="state"
              labelId="state"
              name="stateId"
              value={stateId}
              label="State"
              onChange={handleChange}
            >
              {states.map(({ id, name }) => (
                <MenuItem value={id} key={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl style={{ marginBottom: 20 }}>
            <InputLabel htmlFor="nextView">Next View</InputLabel>
            <Select
              id="nextView"
              labelId="nextView"
              name="nextViewId"
              value={nextViewId}
              label="Next View"
              onChange={handleChange}
            >
              {views.map(({ id, name }) => (
                <MenuItem value={id} key={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <ButtonCustom
            size="small"
            customColor="light"
            className={styles.submit}
            onClick={handleUpdate}
          >
            {!id ? "Create" : "Update"}
          </ButtonCustom>
        </div>
      </Box>
    </Modal>
  );
};

export default RouteModal;
