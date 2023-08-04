import React, {type ReactElement, type ReactNode, type FC} from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  type DialogProps,
} from '@mui/material';
import {LoadingButton} from '@mui/lab';

interface Props {
  open: boolean;
  title: string;
  contentText?: string;
  closeDialogHandler: () => void;
  formSubmitHandler: () => Promise<void>;
  isProcessing: boolean;
  children?: ReactNode;
  stretch?: boolean;
}

const FormDialogCustom: FC<Props & DialogProps> = ({
  open,
  title,
  contentText,
  closeDialogHandler,
  formSubmitHandler,
  isProcessing,
  children,
  stretch = true,
  ...props
}): ReactElement => {
  return (
    <Dialog
      open={open}
      maxWidth={stretch ? false : undefined}
      onClose={closeDialogHandler}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {contentText !== undefined && (
          <DialogContentText sx={{paddingBottom: '12px'}}>
            {contentText}
          </DialogContentText>
        )}
        {children}
      </DialogContent>
      <DialogActions sx={{padding: '16px 24px'}}>
        <LoadingButton
          variant="contained"
          loading={isProcessing}
          onClick={() => {
            formSubmitHandler();
          }}
        >
          Confirm
        </LoadingButton>
        <Button
          variant="outlined"
          onClick={() => {
            closeDialogHandler();
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialogCustom;
