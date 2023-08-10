import {FC, useState, useEffect} from 'react';
import {
  Box,
  Input,
  Modal,
  Button,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  FormControl,
} from '@mui/material';
import {showToast} from '@/http/mixins';
import {ModalStyle} from '@/constants/styleConfig';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkflowViewComponentService from '@/http/api/workflow-view-component';
import WorkflowViewService from '@/http/api/workflow-view';

import styles from './index.module.scss';

interface IProps {
  open: boolean;
  values?: Record<string, string>;
  setOpen: (open: boolean) => void;
  refreshData: () => void;
}

type ComponentPorps = {
  values: any;
  handleChange: (value: any) => void;
  handleRemove: (value: any) => void;
};

// [
//   "INFO_Title",
//   "INFO_Description",
//   "INFO_Image",
//   "INPUT_String",
//   "INPUT_Number",
//   "INPUT_Date",
//   "INPUT_File"
// ]
export enum ComponentType {
  INFO_Title = 'INFO_Title',
  INFO_Description = 'INFO_Description',
}

const Component: FC<ComponentPorps> = ({
  values,
  handleChange,
  handleRemove,
}) => {
  const {
    type,
    properties: {value},
  } = values;
  const onChange = (event: any, key: string) => {
    const {value} = event.target;
    let newVal = {};
    if (key === 'type') {
      newVal = {
        [key]: value,
      };
    } else {
      newVal = {
        properties: {
          [key]: value,
        },
      };
    }
    handleChange(newVal);
  };
  return (
    <>
      <FormControl style={{marginBottom: 20}}>
        <InputLabel htmlFor="type">Type</InputLabel>
        <Select
          id="type"
          labelId="type"
          name="type"
          value={type}
          label="View"
          onChange={e => onChange(e, 'type')}
        >
          {Object.keys(ComponentType).map(key => (
            <MenuItem value={key} key={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {type && (
        <FormControl style={{marginBottom: 6}}>
          <InputLabel htmlFor="value">Value</InputLabel>
          <Input
            id="value"
            value={value}
            onChange={e => onChange(e, 'value')}
          />
        </FormControl>
      )}
      <IconButton
        aria-label="delete"
        color="error"
        style={{marginBottom: 20}}
        onClick={handleRemove}
      >
        <DeleteIcon />
      </IconButton>
    </>
  );
};

const ComponentModal: FC<IProps> = ({
  open,
  setOpen,
  refreshData,
  values = {
    id: undefined,
  },
}) => {
  const [components, setComponents] = useState<any[]>([]);
  const [hasComponents, setHasComponents] = useState(false);
  const {id: viewId} = values;

  const handleUpdate = async () => {
    if (!components.length) {
      return showToast('error', 'Please add at least one component');
    }
    const emptyComponent = components.filter(
      ({type, properties: {value}}) => !type || !value
    );
    if (emptyComponent.length) {
      return showToast('error', 'Please fill all the components');
    }
    components.forEach(async (component, index) => {
      const {id} = component;
      if (id) {
        await WorkflowViewComponentService.update(id, {
          ...component,
          sort: index,
        });
      } else {
        await WorkflowViewComponentService.createMany({
          data: [{...component, sort: index}],
        });
      }
    });
    refreshData();
    setOpen(false);
    setComponents([]);
    setHasComponents(false);
  };
  const getComponentValue = async (id: string) => {
    const {components} = await WorkflowViewService.get(id);
    setHasComponents(!!components.length);
    setComponents([...components]);
  };
  const handleAdd = () => {
    components.push({
      viewId,
      type: '',
      properties: {value: ''},
    });
    setComponents([...components]);
  };
  const handleChange = (values: any, index: number) => {
    const oldValues = components[index];
    if (oldValues) {
      components[index] = {...oldValues, ...values};
      setComponents([...components]);
    }
  };
  const handleRemove = async (index: number) => {
    const target = components[index];
    if (target) {
      const {id} = target;
      if (id) {
        await WorkflowViewComponentService.delete(id);
      }
      components.splice(index, 1);
      setComponents([...components]);
    }
  };

  useEffect(() => {
    open && viewId && getComponentValue(viewId);
  }, [open]);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={ModalStyle}>
        <div className={styles.container}>
          <CloseIcon className={styles.close} onClick={() => setOpen(false)} />
          <h3 style={{marginBottom: 30}}>
            {hasComponents ? 'Edit' : 'New'} Component
          </h3>
          {components.map((values, index) => (
            <Component
              key={index}
              values={values}
              handleRemove={() => handleRemove(index)}
              handleChange={values => handleChange(values, index)}
            />
          ))}
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            style={{width: 100, marginBottom: 20}}
            onClick={handleAdd}
          >
            Add
          </Button>
          <Button
            size="small"
            variant="outlined"
            className={styles.submit}
            onClick={handleUpdate}
          >
            {hasComponents ? 'Update' : 'Create'}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ComponentModal;
