import React, { useState, useEffect, type ReactElement } from 'react';
import { Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import InputTextCustom from '@/components/InputTextCustom/InputTextCustom';
import LoadingButtonCustom from '@/components/LoadingButtonCustom/LoadingButtonCustom';
import TableCustom from '@/components/TableCustom/TableCustom';
import { sendRequest, showError } from '@/shared/libs/mixins';
import Role from '@/shared/libs/role';

const TeamRoles = (): ReactElement => {
  /**
  * Declarations
  */
  const headers = ['Name', 'Description', 'Permissions'];

  /**
  * States
  */
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [newFetch, setNewFetch] = React.useState(false);
  const [rows, setRows] = useState([] as Array<Record<string, any>>);
  const [roleName, setRoleName] = React.useState('');

  /**
  * Handlers
  */
  const modalOpenHandler = (): void => {
    setModal(true);
  };

  const modalCloseHandler = (): void => {
    setModal(false);
  };

  const createRole = async (): Promise<void> => {
    await sendRequest(setIsProcessing, async () => {
      await (new Role()).create(roleName);
    });
    modalCloseHandler();
    setNewFetch(!newFetch);
  };

  /**
  * Data Fetching
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
  }, [newFetch]);

  return (
    <>
      <Stack
        direction='column'
        spacing={2}
        alignItems="flex-end"
      >
        <ButtonCustom
          color='dark'
          onClick={() => {
            modalOpenHandler();
          }}
        >
          New role
        </ButtonCustom>
        <TableCustom headers={headers} rows={rows} ></TableCustom>
      </Stack>
      <Dialog open={modal} onClose={modalCloseHandler}>
        <DialogTitle>Role Name</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ paddingBottom: '12px' }}
          >
            Enter the desired role name in the designated field to create a role.
          </DialogContentText>
          <InputTextCustom
            label='Role name'
            variant='outlined'
            value={roleName}
            type='text'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setRoleName(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{ padding: '16px 24px' }}
        >
          <LoadingButtonCustom
            color='dark'
            loading={isProcessing}
            onClick={() => {
              void createRole();
            }}
          >
            Confirm
          </LoadingButtonCustom>
          <ButtonCustom
            color='light'
            onClick={modalCloseHandler}
          >
            Cancel
          </ButtonCustom>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TeamRoles;
