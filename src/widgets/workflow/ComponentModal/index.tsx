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
import {showToast} from '@/shared/libs/mixins';
import {ModalStyle} from '@/constants/styleConfig';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewService from '@/shared/libs/workflow-view';
import ComponentService from '@/shared/libs/workflow-view-components';

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

enum ComponentType {
  Title,
  Paragraph,
}

const Component: FC<ComponentPorps> = ({
  values,
  handleChange,
  handleRemove,
}) => {
  const {type, value} = values;
  const onChange = (event: any, key: string) => {
    const {value} = event.target;
    handleChange({
      [key]: value,
    });
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
  const viewService = new ViewService();
  const componentService = new ComponentService();

  const handleUpdate = () => {
    if (!components.length) {
      return showToast('error', 'Please add at least one component');
    }
    const emptyComponent = components.filter(
      ({type, value}) => !type || !value
    );
    if (emptyComponent.length) {
      return showToast('error', 'Please fill all the components');
    }
    if (hasComponents) {
      // TODO: do update when we have componentId
    } else {
      // TODO: do create when update the service
    }
    refreshData();
    setOpen(false);
    setComponents([]);
    setHasComponents(false);
  };
  const getComponentValue = async (id: string) => {
    const {components} = await viewService.getView(id);
    setHasComponents(!!components.length);
    setComponents([...components]);
  };
  const handleAdd = () => {
    components.push({
      type: '',
      value: '',
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
  const handleRemove = (index: number) => {
    if (components[index]) {
      components.splice(index, 1);
      setComponents([...components]);
    }
  };

  useEffect(() => {
    viewId && getComponentValue(viewId);
  }, [viewId]);

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
