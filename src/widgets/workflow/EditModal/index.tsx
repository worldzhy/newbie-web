import {FC, useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {ModalStyle} from '@/constants/styleConfig';
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Modal,
} from '@mui/material';
import Workflow from '@/shared/libs/workflow';
import CloseIcon from '@mui/icons-material/Close';
import ViewsService from '@/shared/libs/workflow-view';
import StatesService from '@/shared/libs/workflow-state';

import styles from './index.module.scss';

interface IProps {
  type: string;
  open: boolean;
  values?: Record<string, string>;
  setOpen: (open: boolean) => void;
  refreshData?: () => void;
}

const EditModal: FC<IProps> = ({
  type,
  open,
  setOpen,
  refreshData,
  values = {id: undefined, name: '', description: ''},
}) => {
  const router = useRouter();
  const {id: workflowId} = router.query as {id: string};
  const {id, name: initName, description: initDesc} = values;
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const workflowService = new Workflow();
  const viewService = new ViewsService();
  const stateService = new StatesService();

  const handleUpdate = async () => {
    if (id) {
      if (type === 'workflow') {
        await workflowService.updateWorkflow({id, name, description: desc});
      } else if (type === 'view') {
        await viewService.updateView({id, name, description: desc});
      } else if (type === 'state') {
        await stateService.updateState({id, name, description: desc});
      }
    } else {
      if (type === 'workflow') {
        await workflowService.createWorkflows({name, description: desc});
      } else if (type === 'view') {
        await viewService.createView({workflowId, name, description: desc});
      } else if (type === 'state') {
        await stateService.createState({workflowId, name, description: desc});
      }
    }
    setName('');
    setDesc('');
    setOpen(false);
    refreshData && refreshData();
  };

  useEffect(() => {
    setName(initName);
    setDesc(initDesc);
  }, [initName, initDesc]);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={ModalStyle}>
        <div className={styles.container}>
          <CloseIcon className={styles.close} onClick={() => setOpen(false)} />
          <h3 style={{marginBottom: 30}}>
            {!id ? 'New' : 'Edit'} {type}
          </h3>
          <FormControl style={{marginBottom: 30}}>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FormControl>
          <FormControl style={{marginBottom: 20}}>
            <InputLabel htmlFor="desc">Description</InputLabel>
            <Input
              id="desc"
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
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

export default EditModal;
