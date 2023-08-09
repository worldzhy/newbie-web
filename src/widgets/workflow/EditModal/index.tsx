import {FC, useState, useEffect} from 'react';
import {
  Box,
  Input,
  Modal,
  Button,
  InputLabel,
  FormControl,
} from '@mui/material';
import {useRouter} from 'next/router';
import {ModalStyle} from '@/constants/styleConfig';
import CloseIcon from '@mui/icons-material/Close';
import WorkflowApiRequest from '@/http/api/workflow';
import WorkflowViewApiRequest from '@/http/api/workflow-view';
import WorkflowStateApiRequest from '@/http/api/workflow-state';

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
  const workflowService = new WorkflowApiRequest();
  const viewService = new WorkflowViewApiRequest();
  const stateService = new WorkflowStateApiRequest();

  const handleUpdate = async () => {
    if (id) {
      if (type === 'workflow') {
        await workflowService.update(id, {name, description: desc});
      } else if (type === 'view') {
        await viewService.update(id, {name, description: desc});
      } else if (type === 'state') {
        await stateService.update(id, {name, description: desc});
      }
    } else {
      if (type === 'workflow') {
        await workflowService.create({name, description: desc});
      } else if (type === 'view') {
        await viewService.create({workflowId, name, description: desc});
      } else if (type === 'state') {
        await stateService.create({workflowId, name, description: desc});
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
