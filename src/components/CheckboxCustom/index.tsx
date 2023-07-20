import React, {type ReactElement, type FC} from 'react';
import {Checkbox, type CheckboxProps} from '@mui/material';
import styleConfig from '@/constants/styleConfig';

const CheckboxCustom: FC<CheckboxProps> = ({
  checked,
  onChange,
}): ReactElement => {
  return (
    <Checkbox
      checked={checked}
      sx={{
        color: `${styleConfig.color.primaryBlackColor}`,
        '&.Mui-checked': {
          color: `${styleConfig.color.primaryBlackColor}`,
        },
      }}
      onChange={onChange}
    />
  );
};

export default CheckboxCustom;
