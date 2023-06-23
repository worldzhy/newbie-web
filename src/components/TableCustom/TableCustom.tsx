import React, { type ReactElement, type FC } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import styleConfig from '@/constants/styleConfig';

interface Props {
  headers: string[]
  rows: Array<Record<string, any>>
}

const TableCustom: FC<Props> = ({ headers, rows }): ReactElement => {
  return (
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: `${styleConfig.color.primaryGrayColor}`,
              '& td, & th': { border: `2px solid ${styleConfig.color.primaryBlackColor}` },
              '& th': { color: `${styleConfig.color.primaryWhiteColor}`, fontSize: '14px', fontWeight: '700' }
            }}
          >
            {headers.map((label: string, key: number) => (
              <TableCell key={key} align='center'>{label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, key) => (
            <TableRow
              key={key}
              sx={{
                '& td, & th': { border: `2px solid ${styleConfig.color.primaryBlackColor}` },
                '& th': { color: `${styleConfig.color.primaryGrayColor}`, fontSize: '14px', fontWeight: '400' }
              }}
            >
              {Object.keys(row).map((field: string, key: number) => (
                <TableCell key={key} align='center'>{row[field]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableCustom;
