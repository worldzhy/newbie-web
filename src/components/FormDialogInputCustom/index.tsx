import React, {type ReactElement, type FC} from 'react';
import {Stack, TextField, Typography, type TextFieldProps} from '@mui/material';

interface Props {
  label: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
}

const FormDialogInputCustom: FC<Props & TextFieldProps> = ({
  label,
  type,
  onChange,
  value,
  placeholder,
  multiline = false,
  rows = 0,
  ...props
}): ReactElement => {
  return (
    <Stack
      direction={{xs: 'column', sm: 'row'}}
      alignItems={{xs: 'flex-start'}}
      spacing={{xs: 1}}
    >
      <Typography
        sx={{
          width: '150px',
        }}
      >
        {label}
      </Typography>
      <TextField
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        multiline={multiline}
        rows={rows}
        hiddenLabel
        variant="outlined"
        size="small"
        type={type ?? 'string'}
      />
    </Stack>
  );
};

export default FormDialogInputCustom;
