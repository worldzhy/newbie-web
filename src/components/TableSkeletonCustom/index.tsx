import {type FC} from 'react';
import {TableCell, TableRow} from '@mui/material';
import SkeletonCustom from '../SkeletonCustom';

interface Props {
  numCols: number;
  numRows?: number;
}

const TableSkeletonCustom: FC<Props> = ({numCols, numRows = 3}) => (
  <>
    {Array.from(new Array(numRows)).map((_, keyi: number) => (
      <TableRow key={`rows-${keyi}`}>
        {Array.from(new Array(numCols)).map((_, keyj: number) => (
          <>
            <TableCell key={`cols-${keyj}`} align="center">
              <SkeletonCustom numRows={1} />
            </TableCell>
          </>
        ))}
      </TableRow>
    ))}
  </>
);

export default TableSkeletonCustom;
