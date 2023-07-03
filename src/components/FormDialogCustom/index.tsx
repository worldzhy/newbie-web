import React, { type ReactElement, type ReactNode, type FC } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import LoadingButtonCustom from '../LoadingButtonCustom';
import ButtonCustom from '../ButtonCustom';
import styleConfig from '@/constants/styleConfig';

interface Props {
  open: boolean;
  title: string;
  contentText?: string;
  closeDialogHandler: () => void;
  formSubmitHandler: () => Promise<void>;
  isProcessing: boolean;
  children?: ReactNode;
}

const FormDialogCustom: FC<Props> = ({
  open,
  title,
  contentText,
  closeDialogHandler,
  formSubmitHandler,
  isProcessing,
  children,
  ...props
}): ReactElement => {
  return (
    <Dialog
      open={open}
      maxWidth={false}
      onClose={closeDialogHandler}
      sx={{
        '.MuiDialog-paper': {
          border: `2px solid ${styleConfig.color.primaryBlackColor}`,
          padding: { xs: '0px', sm: '10px' },
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {contentText !== undefined && (
          <DialogContentText sx={{ paddingBottom: '12px' }}>
            {contentText}
          </DialogContentText>
        )}
        {children}
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <LoadingButtonCustom
          customColor="dark"
          loading={isProcessing}
          onClick={() => {
            void formSubmitHandler();
          }}
        >
          Confirm
        </LoadingButtonCustom>
        <ButtonCustom
          customColor="light"
          onClick={() => {
            closeDialogHandler();
          }}
        >
          Cancel
        </ButtonCustom>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialogCustom;
