import styles from './InputTextCustom.module.css';
import React, { type FC } from 'react';
import { TextField, type TextFieldProps } from '@mui/material';

interface Props {
  className?: string;
}

const InputTextCustom: FC<Props & TextFieldProps> = ({
  className,
  id,
  label,
  variant,
  onChange,
  value,
  type,
  ...props
}) => {
  return (
    <TextField
      className={`${className === undefined ? '' : className} ${
        styles.inputText
      }`}
      id={id}
      label={label}
      variant={variant}
      onChange={onChange}
      value={value}
      type={type}
    />
  );
};

export default InputTextCustom;
