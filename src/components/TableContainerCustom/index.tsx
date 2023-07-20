import React, {type ReactElement, type FC, type ReactNode} from 'react';
import {
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableBody,
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
