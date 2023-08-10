import {FC, useState, useEffect} from 'react';
import {
  Box,
  Modal,
  Switch,
  Select,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import {useRouter} from 'next/router';
import {ModalStyle} from '@/constants/styleConfig';
import CloseIcon from '@mui/icons-material/Close';
import WorlflowRouteService from '@/http/api/workflow-route';
import {WorkflowState, WorkflowView} from '@prisma/client';

import styles from './index.module.scss';

interface IProps {
  views: WorkflowView[];
  states: WorkflowState[];
  open: boolean;
  values?: Record<string, string>;
  setOpen: (open: boolean) => void;
  refreshData: () => void;
}

const defaultValues = {
  id: undefined,
  startSign: false,
  viewId: '',
  stateId: '',
  nextViewId: '',
};

const RouteModal: FC<IProps> = ({
  views,
  states,
  open,
  setOpen,
  values = defaultValues,
  refreshData,
}) => {
  const {
    id,
    viewId: initView,
    stateId: initState,
    nextViewId: initNextView,
    startSign: initStartSign,
  } = values;
  const router = useRouter();
  const {id: workflowId} = router.query as {id: string};
  const [formValues, setFormValues] = useState<any>(defaultValues);
  const {startSign, viewId, stateId, nextViewId} = formValues;

  const handleChange = (event: any) => {
    const {name, value, checked} = event.target;
    setFormValues({
      ...formValues,
      [name]: name === 'startSign' ? checked : value,
    });
  };
  const handleUpdate = async () => {
    const params = {
      workflowId,
      startSign,
      viewId,
      stateId,
      nextViewId,
    };
    if (id) {
      await WorlflowRouteService.update(id, params);
    } else {
      await WorlflowRouteService.create(params);
    }
    setFormValues(defaultValues);
    setOpen(false);
    refreshData();
  };

  useEffect(() => {
    setFormValues({
      startSign: initStartSign,
      viewId: initView,
      stateId: initState,
      nextViewId: initNextView,
    });
  }, [initStartSign, initView, initState, initNextView]);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={ModalStyle}>
        <div className={styles.container}>
          <CloseIcon className={styles.close} onClick={() => setOpen(false)} />
          <h3 style={{marginBottom: 30}}>{!id ? 'New' : 'Edit'} Route</h3>
          <FormControlLabel
            label="Start Point"
            name="startSign"
            control={<Switch checked={startSign} onChange={handleChange} />}
            style={{marginBottom: 30}}
          />
          <FormControl style={{marginBottom: 20}}>
            <InputLabel htmlFor="view">View</InputLabel>
            <Select
              id="view"
              labelId="view"
              name="viewId"
              value={viewId}
              label="View"
              onChange={handleChange}
            >
              {views.map(({id, name}) => (
                <MenuItem value={id} key={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl style={{marginBottom: 20}}>
            <InputLabel htmlFor="state">State</InputLabel>
            <Select
              id="state"
              labelId="state"
              name="stateId"
              value={stateId}
              label="State"
              onChange={handleChange}
            >
              {states.map(({id, name}) => (
                <MenuItem value={id} key={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl style={{marginBottom: 20}}>
            <InputLabel htmlFor="nextView">Next View</InputLabel>
            <Select
              id="nextView"
              labelId="nextView"
              name="nextViewId"
              value={nextViewId}
              label="Next View"
              onChange={handleChange}
            >
              {views.map(({id, name}) => (
                <MenuItem value={id} key={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            size="small"
            variant="outlined"
            className={styles.submit}
            onClick={handleUpdate}
          >
            {!id ? 'Create' : 'Update'}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default RouteModal;
