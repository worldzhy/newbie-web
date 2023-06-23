import React, { useState, useEffect, type ReactElement } from 'react';
import { Stack } from '@mui/material';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import TableCustom from '@/components/TableCustom/TableCustom';
import Role from '@/shared/libs/role';

const TeamRoles = (): ReactElement => {
  /**
  * Declarations
  */
  const headers = ['Name', 'Description', 'Permissions'];

  /**
  * States
  */
  const [rows, setRows] = useState([] as Array<Record<string, any>>);

  /**
  * Handlers
  */
  useEffect(() => {
    const startFetching = async (): Promise<void> => {
      try {
        setRows([]);
        const roles = await (new Role()).get();
        if (!ignore) {
          const createData = (name: string, description: string, permissions: string): { name: string, description: string, permissions: string } => {
            return { name, description, permissions };
          };
          const fetchedRows = roles.map(role => createData(role.name, role.description ?? 'xxx', 'Edit'));
          setRows(fetchedRows);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    let ignore = false;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    startFetching();
    return () => {
      ignore = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack
      direction='column'
      spacing={2}
      alignItems="flex-end"
    >
      <ButtonCustom
        color='dark'
        // onClick={() => {
        //   void addRoleHandler();
        // }}
      >
        New role
      </ButtonCustom>
      <TableCustom headers={headers} rows={rows} ></TableCustom>
    </Stack>
  );
};

export default TeamRoles;
