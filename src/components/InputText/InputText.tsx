import styles from './InputText.module.css';
import React, { type FC } from 'react';
import { TextField, type TextFieldProps } from '@mui/material';

interface Props {
  className?: string
}

const InputText: FC<Props & TextFieldProps> = ({ className, id, label, variant, onChange, value, ...props }) => {
  return <TextField
    className={`${className === undefined ? '' : className} ${styles.inputText}`}
    id={id}
    label={label}
    variant={variant}
    onChange={onChange}
    value={value}
  />;
};

export default InputText;
