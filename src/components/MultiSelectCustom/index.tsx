import React, {type FC} from 'react';
import {
  MenuItem,
  OutlinedInput,
  FormControl,
  ListItemText,
  Select,
  Typography,
  Stack,
  Checkbox,
} from '@mui/material';
import {type SelectChangeEvent} from '@mui/material/Select';

interface Props {
  label: string;
  options: string[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

const MultiSelectCustom: FC<Props> = ({
  label,
  options,
  selected,
  setSelected,
}) => {
  /**
   * Declarations
   */
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  /**
   * Handlers
   */
  const handleChange = (event: SelectChangeEvent<typeof selected>): void => {
    const {
      target: {value},
    } = event;
    setSelected(typeof value === 'string' ? value.split(',') : value);
  };

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
      <FormControl sx={{m: 0, width: '100%'}}>
        <Select
          multiple
          value={selected}
          onChange={handleChange}
          input={
            <OutlinedInput
              sx={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            />
          }
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}
          variant="outlined"
          size="small"
        >
          {options.map(opt => (
            <MenuItem
              key={opt}
              value={opt}
            >
              <Checkbox checked={selected.includes(opt)} />
              <ListItemText primary={opt} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default MultiSelectCustom;
