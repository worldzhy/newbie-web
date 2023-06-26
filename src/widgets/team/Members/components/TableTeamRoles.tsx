import React, { type ReactElement, type FC, type ReactNode, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton, Stack } from '@mui/material';
import styleConfig from '@/constants/styleConfig';
import { showError } from '@/shared/libs/mixins';

/**
*
* Table responsible for showing the list of roles.
* To use this table, provide roleId in props. This component will do the data fetching of the permissions here.
* This component is used in Team > Roles page.
*
**/

/**
* Types
*/

interface Props {
  children?: ReactNode
}

const TablePermission: FC<Props> = ({ children }): ReactElement => {
  /**
  * Declarations
  */
  const headers = ['Name', 'Description', 'Permission'];

  /**
  * States
  */
  const [rows, setRows] = useState([] as Array<Record<string, any>>);

  /**
  * Data Fetching
  */
  useEffect(() => {
    const startFetching = async (): Promise<void> => {
      try {
        setRows([]);
        // const roles = await (new Role()).get();
        const roles = [{ name: 'Name', description: null }];
        if (!ignore) {
          const createData = (name: string, description: string, permissions: string): { name: string, description: string, permissions: string } => {
            return { name, description, permissions };
          };
          const fetchedRows = roles.map(role => createData(role.name, role.description ?? 'xxx', 'Edit'));
          setRows(fetchedRows);
        }
      } catch (err: unknown) {
        if (!ignore) {
          showError(err);
        }
      }
    };
    let ignore = false;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    startFetching();
    return () => {
      ignore = true;
    };
  }, []);

  const skeleton = (
    <Stack
      direction='column'
      spacing={1}
    >
      {Array.from(new Array(3)).map((_, key: number) => (
        <Skeleton key={key} variant='rounded' animation='wave' height={60} />
      ))}
    </Stack>
  );

  const table = (
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
              {Object.keys(row).map((field: string, key: number) => {
                if (Object.keys(row).length - 1 === key) {
                  return <TableCell key={key} align='center'>{children}</TableCell>;
                }
                return <TableCell key={key} align='center'>{row[field]}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return rows.length === 0 ? skeleton : table;
};

export default TablePermission;
