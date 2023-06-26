import React, { useState, useEffect, type ReactElement } from 'react';
import { Stack } from '@mui/material';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import InputTextCustom from '@/components/InputTextCustom/InputTextCustom';
import { sendRequest, showError } from '@/shared/libs/mixins';
import Role from '@/shared/libs/role';
import TablePermission from './Permissions';
import RolesTable from './Roles';
import FormDialogCustom from '@/components/FormDialogCustom';

const TeamRoles = (): ReactElement => {
  /**
   * Declarations
   */

  /**
   * States
   */
  const [isProcessing, setIsProcessing] = React.useState(false);
  // New Role Modal
  const [newRoleModal, setNewRoleModal] = React.useState(false);

  // Edit Role Modal
  // const [editRoleModal, setEditRolemodal] = React.useState(false);
  const [newFetch, setNewFetch] = React.useState(false);
  const [rows, setRows] = useState([] as Array<Record<string, any>>);
  const [roleName, setRoleName] = React.useState('');

  const [activeRole, setActiveRole] = React.useState<null | string>(null);

  /**
   * Handlers
   */
  const createRole = async (): Promise<void> => {
    await sendRequest(setIsProcessing, async () => {
      await new Role().create(roleName);
    });
    setNewRoleModal(false);
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
            setNewRoleModal(true);
          }}
        >
          New role
        </ButtonCustom>
        <RolesTable rows={rows} setDiaglogState={setActiveRole} />
      </Stack>
      <FormDialogCustom
        open={newRoleModal}
        title="Role Name"
        contentText="Enter the desired role name in the designated field to create a
            role."
        closeDialogHandler={() => {
          setNewRoleModal(true);
        }}
        formSubmitHandler={createRole}
        isProcessing={isProcessing}
      >
        <InputTextCustom
          label="Role name"
          variant="outlined"
          value={roleName}
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setRoleName(e.target.value);
          }}
        />
      </FormDialogCustom>
      <FormDialogCustom
        open={activeRole != null}
        title="Edit Role Permission"
        closeDialogHandler={() => {
          setActiveRole(null);
        }}
        formSubmitHandler={createRole}
        isProcessing={isProcessing}
      >
        <TablePermission roleId={activeRole as string} />
      </FormDialogCustom>
    </>
  );
};

export default TeamRoles;
