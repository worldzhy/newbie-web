import styles from './InputText.module.css';
import React, { type FC } from 'react';
import { TextField, type TextFieldProps } from '@mui/material';

interface Props {
  className?: string
}

const InputText: FC<Props & TextFieldProps> = ({ className, id, label, variant, ...props }) => {
  return <TextField
    className={`${className === undefined ? '' : className} ${styles.inputText}`}
    id={id}
    label={label}
    variant={variant}
  />;
};

export default InputText;
