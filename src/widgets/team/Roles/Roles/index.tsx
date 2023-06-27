import React, { type ReactElement, type FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  Stack,
} from '@mui/material';
import styleConfig from '@/constants/styleConfig';
import styles from './index.module.css';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';

interface Props {
  rows: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  setDiaglogState: React.Dispatch<
    React.SetStateAction<{
      id: string;
      name: string;
    } | null>
  >;
}

const RolesTable: FC<Props> = ({ rows, setDiaglogState }): ReactElement => {
  /**
   * Declarations
   */
  const headers = ['Name', 'Description', 'Permissions'];

  const skeleton = (
    <Stack direction="column" spacing={1} className={styles.skeleton}>
      {Array.from(new Array(3)).map((_, key: number) => (
        <Skeleton key={key} variant="rounded" animation="wave" height={60} />
      ))}
    </Stack>
  );

  const table = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
          {rows.map((row, key) => (
            <TableRow
              key={key}
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
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">
                <ButtonCustom
                  customColor="link"
                  onClick={() => {
                    setDiaglogState({ id: row.id, name: row.name });
                  }}
                >
                  Edit
                </ButtonCustom>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return rows.length === 0 ? skeleton : table;
};

export default RolesTable;
