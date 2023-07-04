import React, { type ReactElement, type FC, type ReactNode } from 'react';
import { TableCell } from '@mui/material';

interface Props {
  children: ReactNode;
}

const TableCellCustom: FC<Props> = ({ children }): ReactElement => {
  return <TableCell align="center">{children}</TableCell>;
};

export default TableCellCustom;
