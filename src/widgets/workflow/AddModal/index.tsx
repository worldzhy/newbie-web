import { type FC, useState } from 'react';
import { ModalStyle } from '@/constants/styleConfig';
import { Box, FormControl, Input, InputLabel, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ButtonCustom from '@/components/ButtonCustom';

import styles from './index.module.scss';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddModal: FC<IProps> = ({ open, setOpen }) => {
  const [name, setName] = useState('');

  const handleAdd = (): void => {
    // TODO: handle add
    console.log(name, '----> name');
    setName('');
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Box sx={ModalStyle}>
        <div className={styles.container}>
          <CloseIcon
            className={styles.close}
            onClick={() => {
              setOpen(false);
            }}
          />
          <h3 style={{ marginBottom: 20 }}>Add Workflow</h3>
          <FormControl>
            <InputLabel htmlFor="workflowName">Name</InputLabel>
            <Input
              id="workflowName"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </FormControl>
          <ButtonCustom
            size="small"
            customColor="light"
            className={styles.submit}
            onClick={handleAdd}
          >
            Add
          </ButtonCustom>
        </div>
      </Box>
    </Modal>
  );
};

export default AddModal;
