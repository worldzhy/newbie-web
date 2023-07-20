import {type FC, type ReactElement} from 'react';
import TableRowCustom from '../TableRowCustom';
import TableCellCustom from '../TableCellCustom';
import SkeletonCustom from '../SkeletonCustom';

interface Props {
  numCols: number;
  numRows?: number;
}

const TableSkeletonCustom: FC<Props> = ({
  numCols,
  numRows = 3,
}): ReactElement => {
  return (
    <>
      {Array.from(new Array(numRows)).map((_, keyi: number) => (
        <TableRowCustom key={`rows-${keyi}`}>
          {Array.from(new Array(numCols)).map((_, keyj: number) => (
            <>
              <TableCellCustom key={`cols-${keyj}`}>
                <SkeletonCustom numRows={1} />
              </TableCellCustom>
            </>
          ))}
        </TableRowCustom>
      ))}
    </>
  );
};

export default TableSkeletonCustom;
