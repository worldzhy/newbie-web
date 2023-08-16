import {type FC} from 'react';
import {TableCell, TableRow} from '@mui/material';

interface Props {
  headers: string[];
}

const TableHeaderCustom: FC<Props> = ({headers}) => {
  return (
    <TableRow>
      {headers.map((label: string, key: number) => (
        <TableCell key={key} align="center">
          {label}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TableHeaderCustom;
