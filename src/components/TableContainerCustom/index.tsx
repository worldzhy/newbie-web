import React, {type ReactElement, type FC, type ReactNode} from 'react';
import {
  Table,
  Paper,
  TableHead,
  TableBody,
  TableContainer,
} from '@mui/material';
import TableHeaderCustom from '../TableHeaderCustom';

interface Props {
  headers: string[];
  children: ReactNode;
}

const TableContainerCustom: FC<Props> = ({headers, children}): ReactElement => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableHeaderCustom headers={headers}></TableHeaderCustom>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableContainerCustom;
