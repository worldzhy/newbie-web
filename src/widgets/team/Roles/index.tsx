import React, { useState, useEffect, type ReactElement } from 'react';
import {
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import InputTextCustom from '@/components/InputTextCustom/InputTextCustom';
import LoadingButtonCustom from '@/components/LoadingButtonCustom/LoadingButtonCustom';
import { sendRequest, showError } from '@/shared/libs/mixins';
import Role from '@/shared/libs/role';
import TablePermission from './Permissions';
import RolesTable from './Roles';

const TeamRoles = (): ReactElement => {
  /**
   * Declarations
   */

  /**
   * States
   */
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [newFetch, setNewFetch] = React.useState(false);
  const [rows, setRows] = useState([] as Array<Record<string, any>>);
  const [roleName, setRoleName] = React.useState('');

  const [activeRole, setActiveRole] = React.useState<null | string>(null);

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
      await new Role().create(roleName);
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
        const roles = await new Role().get();
        if (!ignore) {
          const createData = (
            id: string,
            name: string,
            description: string,
            permissions: string
          ): {
            id: string;
            name: string;
            description: string;
            permissions: string;
          } => {
            return { id, name, description, permissions };
          };
          const fetchedRows = roles.map((role) =>
            createData(role.id, role.name, role.description ?? 'xxx', 'Edit')
          );
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
      <Stack direction="column" spacing={2} alignItems="flex-end">
        <ButtonCustom
          customColor="dark"
          onClick={() => {
            modalOpenHandler();
          }}
        >
          New role
        </ButtonCustom>
        <RolesTable rows={rows} setDiaglogState={setActiveRole} />
      </Stack>
      <Dialog open={modal} onClose={modalCloseHandler}>
        <DialogTitle>Role Name</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ paddingBottom: '12px' }}>
            Enter the desired role name in the designated field to create a
            role.
          </DialogContentText>
          <InputTextCustom
            label="Role name"
            variant="outlined"
            value={roleName}
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setRoleName(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px' }}>
          <LoadingButtonCustom
            customColor="dark"
            loading={isProcessing}
            onClick={() => {
              void createRole();
            }}
          >
            Confirm
          </LoadingButtonCustom>
          <ButtonCustom customColor="light" onClick={modalCloseHandler}>
            Cancel
          </ButtonCustom>
        </DialogActions>
      </Dialog>
      <Dialog
        open={activeRole != null}
        maxWidth={false}
        onClose={() => {
          setActiveRole(null);
        }}
      >
        <DialogTitle>Form</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ paddingBottom: '12px' }}>
            Check permissions
          </DialogContentText>
          <TablePermission roleId={activeRole as string} />
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px' }}>
          <LoadingButtonCustom
            customColor="dark"
            loading={isProcessing}
            onClick={() => {
              // void createRole();
            }}
          >
            Confirm
          </LoadingButtonCustom>
          <ButtonCustom
            customColor="light"
            onClick={() => {
              setActiveRole(null);
            }}
          >
            Cancel
          </ButtonCustom>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TeamRoles;
