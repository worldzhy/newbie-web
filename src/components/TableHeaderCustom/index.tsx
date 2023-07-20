import React, {type ReactElement, type FC} from 'react';
import TableRowCustom from '../TableRowCustom';
import TableCellCustom from '../TableCellCustom';

interface Props {
  headers: string[];
}

const TableHeaderCustom: FC<Props> = ({headers}): ReactElement => {
  return (
    <TableRowCustom type="header">
      {headers.map((label: string, key: number) => (
        <TableCellCustom key={key}>{label}</TableCellCustom>
      ))}
    </TableRowCustom>
  );
};

export default TableHeaderCustom;
