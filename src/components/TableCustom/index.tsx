import React, {type ReactElement, type FC, type ReactNode} from 'react';
import {EMPTY_PLACEHOLDER} from '@/constants';
import {
  Table,
  Stack,
  Paper,
  Skeleton,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  TableContainer,
} from '@mui/material';
import styleConfig from '@/constants/styleConfig';
import styles from './index.module.scss';

interface Props {
  headers: string[];
  isLastColActions: boolean;
  rows: Array<Record<string, any>>;
  children?: (key: number) => ReactNode;
}

const TableCustom: FC<Props> = ({
  rows,
  headers,
  children,
  isLastColActions,
}): ReactElement => {
  const skeleton = (
    <Stack direction="column" spacing={1} className={styles.skeleton}>
      {Array.from(new Array(3)).map((_, key: number) => (
        <Skeleton key={key} variant="rounded" animation="wave" height={60} />
      ))}
    </Stack>
  );

  const table = (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: `${styleConfig.color.primaryGrayColor}`,
              '& td, & th': {
                border: `2px solid ${styleConfig.color.primaryBlackColor}`,
              },
              '& th': {
                color: `${styleConfig.color.primaryWhiteColor}`,
                fontSize: '14px',
                fontWeight: '700',
              },
            }}
          >
            {headers.map((label: string, key: number) => (
              <TableCell key={key} align="center">
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowKey) => (
            <TableRow
              key={rowKey}
              sx={{
                '& td, & th': {
                  border: `2px solid ${styleConfig.color.primaryBlackColor}`,
                },
                '& th': {
                  color: `${styleConfig.color.primaryGrayColor}`,
                  fontSize: '14px',
                  fontWeight: '400',
                },
              }}
            >
              {Object.keys(row).map((field: string, key: number) => {
                if (isLastColActions && Object.keys(row).length - 1 === key) {
                  return (
                    <TableCell key={key} align="center">
                      {children && children(rowKey)}
                    </TableCell>
                  );
                }
                return (
                  <TableCell key={key} align="center">
                    {row[field] || EMPTY_PLACEHOLDER}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return rows.length === 0 ? skeleton : table;
};

export default TableCustom;
